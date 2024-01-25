pipeline {
    agent any

    tools {
        nodejs "NodeJS-21.6.1"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    docker.build("docker-compose.yaml")
                }
            }
        }

        stage('SonarQube analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube Server') {
                        sh '''
                        /var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarqUIBE/bin/sonar-scanner \
                        -Dsonar.host.url=http://172.17.0.3:9000 \
                        -Dsonar.login=squ_739cc1a8575faf7cbdef7d986da7e7deb4398824 \
                        -Dsonar.projectKey=my_project_key\
                        -Dsonar.projectBaseDir=/var/jenkins_home/workspace/MyProject
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
