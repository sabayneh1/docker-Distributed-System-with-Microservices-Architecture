pipeline {
    agent any

    environment {
        GIT_CREDENTIAL_ID = 'GithubSecretText'
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }

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
                    docker.build("distributed-system")
                }
            }
        }

        stage('SonarQube analysis') {
            steps {
                script {
                    // Ensure SonarQube details are correctly configured
                    withSonarQubeEnv('My SonarQube Server') {
                        sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=DistributedMicroservices-jenkins \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://35.182.71.62:9000 \
                        -Dsonar.token=sqp_6dae89f64f00623799d78397706f7d87c6791b5c
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
