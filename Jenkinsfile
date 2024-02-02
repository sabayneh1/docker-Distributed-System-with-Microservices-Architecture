pipeline {
    agent any

    environment {
        GIT_CREDENTIAL_ID = 'NewGithubSecretText'
        DOCKER_HOST = 'unix:///var/run/docker.sock'
        JAVA_HOME = '/usr/lib/jvm/java-17-openjdk-amd64'
        DOCKERHUB_CREDENTIAL_ID = 'NewDockerHubCredentials'
        IMAGE_TAG = 'sabayneh/distributed-system'
        TEST_SUCCESS = 'false'
        DEPLOY_DEV_SUCCESS = 'false'
    }

    tools {
        nodejs "NodeJS-21.6.1"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/sabayneh1/docker-Distributed-System-with-Microservices-Architecture.git', credentialsId: env.GIT_CREDENTIAL_ID]],
                    lightweight: true
                ])
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    if (!fileExists('node_modules/')) {
                        unstash 'nodeModules'
                    }
                    sh 'npm ci'
                }
            }
        }

        stage('Cache npm dependencies') {
            steps {
                script {
                    stash(name: 'nodeModules', includes: 'node_modules/')
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', env.DOCKERHUB_CREDENTIAL_ID) {
                        def customImage = docker.build(env.IMAGE_TAG)
                        customImage.push()
                    }
                }
            }
        }

        stage('Run Jest Tests') {
            steps {
                script {
                    env.TEST_SUCCESS = 'false'
                    try {
                        sh 'npm run test -- --detectOpenHandles'
                        env.TEST_SUCCESS = 'true'
                    } catch (Exception e) {
                        echo "Tests failed due to an exception."
                    }
                    echo "TEST_SUCCESS is set to ${env.TEST_SUCCESS}"
                }
            }
        }

        stage('Deploy to Development') {
            when {
                expression { env.TEST_SUCCESS == 'true' }
            }
            steps {
                script {
                    env.DEPLOY_DEV_SUCCESS = 'false'
                    echo "Deploying using Docker Compose in development stage..."
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                    env.DEPLOY_DEV_SUCCESS = 'true'
                    echo "DEPLOY_DEV_SUCCESS is set to ${env.DEPLOY_DEV_SUCCESS}"
                }
            }
        }

        stage('Deploy to Production') {
            when {
                expression { env.DEPLOY_DEV_SUCCESS == 'true' }
            }
            steps {
                script {
                    echo "Deploying using Docker Compose for production..."
                    sh 'docker-compose -f docker-compose.yaml -f docker-compose.prod.yml up -d --no-deps --build --force-recreate'
                }
            }
        }

        stage('SonarQube analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            def sonarQubeScannerHome = tool 'SonarQube_5.0.1.3006'
                            env.PATH = "${sonarQubeScannerHome}/bin:${env.PATH}"
                            sh 'sonar-scanner -Dsonar.projectKey=DistributedMicroservices-jenkins -Dsonar.sources=. -Dsonar.host.url=http://35.183.179.161:9000 -Dsonar.login=$SONAR_TOKEN'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Custom workspace cleanup"
            sh 'find . -path ./node_modules -prune -o -type f -exec rm -f {} +'
        }
        success {
            emailext(
                subject: "BUILD SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "The Jenkins job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' was successful.",
                to: '533a2228-3250-4446-b5e5-925e6023c6b1@mailslurp.com'
            )
        }

        failure {
            // Send email notification on build failure
            emailext(
                subject: "BUILD FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "The Jenkins job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' has failed. Check the build logs for details.",
                to: '533a2228-3250-4446-b5e5-925e6023c6b1@mailslurp.com'
            )
        }
    }
}
