pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Docker Compose') {
            steps {
                script {
                    // Download and install Docker Compose
                    bat 'curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Windows-x86_64.exe -o C:\\docker-compose.exe'
                    bat 'set PATH=%PATH%;C:\\'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Run docker-compose to build services
                    bat 'docker-compose -f docker-compose.yaml build'
                }
            }
        }

        stage('SonarQube analysis') {
            steps {
                script {
                    // Add your SonarQube analysis script here
                    bat '''
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

    post {
        always {
            cleanWs()
        }
    }
}
