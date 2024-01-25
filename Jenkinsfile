pipeline {
    agent any

    tools {
        nodejs "node" // "node" is the name of the Node.js installation from Global Tool Configuration
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

        // Uncomment below if you have tests
        // stage('Test') {
        //     steps {
        //         sh 'npm test'
        //     }
        // }

        // Uncomment below if you have a build script in package.json
        // stage('Build') {
        //     steps {
        //         sh 'npm run build'
        //     }
        // }

        stage('Docker Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('SonarQube Server') {
                    sh '''
                    /var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarqUIBE/bin/sonar-scanner \
                    -Dsonar.host.url=http://172.17.0.3:9000 \
                    -Dsonar.login=squ_739cc1a8575faf7cbdef7d986da7e7deb4398824 \
                    -Dsonar.projectKey=testproject \
                    -Dsonar.projectBaseDir=/var/jenkins_home/workspace/MyProject
                    '''
                }
            }
        }
    }
}

