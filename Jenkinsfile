pipeline {
    agent any

    tools {
        nodejs "NodeJS-21.6.1"
        // Provide the name of the Docker installation configured in Global Tool Configuration
        // dockerTool 'docker-automatic'
    }

    // environment {
    //     // Define the Docker host environment variable
    //     DOCKER_HOST = 'tcp://host.docker.internal:2375'
    // }

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

        // stage('Docker Build') {
        //     steps {
        //         script {
        //             // Use the environment variable for the Docker host
        //             docker.withServer("${env.DOCKER_HOST}") {
        //                 // This assumes you have a Dockerfile in the root of your project
        //                 docker.build("ds")
        //             }
        //         }
        //     }
        // }

        stage('SonarQube analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube Server') {
                        sh '''
                        /var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarqUIBE/bin/sonar-scanner \
                        -Dsonar.host.url=http://172.17.0.3:9000 \
                        -Dsonar.login=squ_739cc1a8575faf7cbdef7d986da7e7deb4398824 \
                        -Dsonar.projectKey=my_project_key \
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
