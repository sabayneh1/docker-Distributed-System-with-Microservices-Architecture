pipeline {
    agent any

    environment {
        GIT_CREDENTIAL_ID = 'NewGithubSecretText'
        DOCKER_HOST = 'unix:///var/run/docker.sock'
        JAVA_HOME = '/usr/lib/jvm/java-17-openjdk-amd64'
        DOCKERHUB_CREDENTIAL_ID = 'NewDockerHubCredentials'
        IMAGE_TAG = 'sabayneh/distributed-system'
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
                    ]],
                    lightweight: true
                ])
            }
        }

        // Other stages remain unchanged

        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                        script {
                            def sonarQubeScannerHome = tool 'SonarQube_5.0.1.3006'
                            env.PATH = "${sonarQubeScannerHome}/bin:${env.PATH}"
                        }
                        sh '''
                            sonar-scanner \
                            -Dsonar.projectKey=DistributedMicroservices-jenkins \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://3.96.66.45:9000 \
                            -Dsonar.login=$SONAR_TOKEN
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Custom workspace cleanup"
            sh 'find . -not -name "node_modules" -not -name "." -not -name ".." -exec rm -rf {} +'
        }
        success {
            emailext(
                subject: "BUILD SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "The Jenkins job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' was successful.",
                to: '533a2228-3250-4446-b5e5-925e6023c6b1@mailslurp.com'
            )
        }
        failure {
            emailext(
                subject: "BUILD FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "The Jenkins job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' has failed. Check the build logs for details.",
                to: '533a2228-3250-4446-b5e5-925e6023c6b1@mailslurp.com'
            )
        }
    }
}
