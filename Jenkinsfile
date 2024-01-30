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
                checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/sabayneh1/docker-Distributed-System-with-Microservices-Architecture.git',
                        credentialsId: "${env.GIT_CREDENTIAL_ID}"
                    ]]
                ])
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
                    withSonarQubeEnv('SonaraQube') {
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            sh '''
                            sonar-scanner \
                            -Dsonar.projectKey=DistributedMicroservices-jenkins \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://35.182.71.62:9000 \
                            -Dsonar.login=$SONAR_TOKEN
                            '''
                        }
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
