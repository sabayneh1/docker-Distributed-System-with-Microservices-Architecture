pipeline {
    agent any

    environment {
        GIT_CREDENTIAL_ID = 'GithubSecretText'
        DOCKER_HOST = 'unix:///var/run/docker.sock'
        JAVA_HOME = '/usr/lib/jvm/java-17-openjdk-amd64' // Set JAVA_HOME to Java 17
        DOCKERHUB_CREDENTIAL_ID = 'DockerHubCredentials' // Add your Docker Hub credentials ID
        IMAGE_TAG = 'sabayneh/distributed-system' // Replace with your Docker Hub username and desired image tag
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

        stage('Docker Build and Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', "${env.DOCKERHUB_CREDENTIAL_ID}") {
                        def customImage = docker.build("${env.IMAGE_TAG}")
                        customImage.push()
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Deploy using Docker Compose
                    sh """
                        cd /home/ubuntu/project/DSM/docker-Distributed-System-with-Microservices-Architecture
                        git pull
                        docker-compose down
                        docker-compose up -d --build
                    """
                }
            }
        }

        stage('SonarQube analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonaraQube') {
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            // Ensure sonar-scanner is in the PATH
                            def sonarQubeScannerHome = tool 'SonarQube_5.0.1.3006'
                            env.PATH = "${sonarQubeScannerHome}/bin:${env.PATH}"

                            sh '''
                            sonar-scanner \
                            -Dsonar.projectKey=DistributedMicroservices-jenkins \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://35.183.41.85:9000 \
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
