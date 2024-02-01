pipeline {
    agent any  // Indicates that this pipeline can run on any available agent

    environment {
        // Define environment variables
        GIT_CREDENTIAL_ID = 'NewGithubSecretText'
        DOCKER_HOST = 'unix:///var/run/docker.sock'
        JAVA_HOME = '/usr/lib/jvm/java-17-openjdk-amd64'
        DOCKERHUB_CREDENTIAL_ID = 'NewDockerHubCredentials'
        IMAGE_TAG = 'sabayneh/distributed-system'
    }

    tools {
        // Specify the version of Node.js to use
        nodejs "NodeJS-21.6.1"
    }

    stages {
        // Checkout stage: Retrieve code from a Git repository
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/sabayneh1/docker-Distributed-System-with-Microservices-Architecture.git',
                        credentialsId: "${env.GIT_CREDENTIAL_ID}"
                    ]],
                    lightweight: true  // Use lightweight checkout for faster execution
                ])
            }
        }
        stage('Install dependencies') {
            steps {
                script {
                    // Check if the 'node_modules' directory exists in the workspace
                    if (!fileExists('node_modules/')) {
                        // If 'node_modules' directory does not exist, retrieve it from the stash
                        // This is useful for reusing 'node_modules' across pipeline runs to save time
                        unstash 'nodeModules'
                    }
                }
                // Run 'npm ci' to install dependencies based on the 'package-lock.json' file
                // This command is preferred in continuous integration setups as it is faster
                // and ensures consistent installations across environments
                sh 'npm ci'
            }
        }

        stage('Cache npm dependencies') {
            steps {
                script {
                    // Stash the 'node_modules' directory for later use in the pipeline or future runs
                    // This is useful for caching dependencies so they don't need to be reinstalled
                    // every time, speeding up the build process
                    stash(name: 'nodeModules', includes: 'node_modules/')
                }
            }
        }


        // Docker build and push stage: Build a Docker image and push it to Docker Hub
        stage('Docker Build and Push') {
            steps {
                script {
                    // Login to Docker registry and push the image
                    docker.withRegistry('https://registry.hub.docker.com', "${env.DOCKERHUB_CREDENTIAL_ID}") {
                        def customImage = docker.build("${env.IMAGE_TAG}")
                        customImage.push()
                    }
                }
            }
        }

        // Deployment stage: Deploy the application to an EC2 instance using Docker Compose
        stage('Deploy to EC2') {
            steps {
                sh '''
                    echo "Deploying using Docker Compose..."
                    # Stop and remove current containers
                    docker-compose down
                    # Build and start new containers
                    docker-compose up -d --build
                '''
            }
        }

        // SonarQube analysis stage: Perform code quality analysis using SonarQube
        stage('SonarQube analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        // Use SonarQube token for authentication
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {

                            // Define the SonarQube scanner and execute the analysis
                            def sonarQubeScannerHome = tool 'SonarQube_5.0.1.3006'
                            env.PATH = "${sonarQubeScannerHome}/bin:${env.PATH}"

                            sh '''
                            sonar-scanner \
                            -Dsonar.projectKey=DistributedMicroservices-jenkins \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://3.99.131.38:9000 \
                            -Dsonar.login=$SONAR_TOKEN
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        // Post-build actions
        always {
            // Custom command to clean up the workspace while preserving node_modules
            echo "Custom workspace cleanup"
            sh 'find . -path ./node_modules -prune -o -type f -exec rm -f {} +'
        }
        success {
            // Send email notification on successful build
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
