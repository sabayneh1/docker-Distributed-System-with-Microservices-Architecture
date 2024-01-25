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
