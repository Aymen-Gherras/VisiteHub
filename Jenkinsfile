pipeline {
    agent any

    environment {
        SERVER_IP = '213.199.58.144'
        SSH_USER = 'root'
        REMOTE_DIR = '~/VisiteHub'
    }

    stages {
        stage('Deploy to Server') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'deploy-key-pem', keyFileVariable: 'SSH_KEY')]) {
                    sh """
                        # 1. Prepare Remote Directory
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no ${SSH_USER}@${SERVER_IP} 'mkdir -p ${REMOTE_DIR}'
                        
                        # 2. Transfer Files
                        # We exclude node_modules, .git, and local build artifacts to speed up transfer
                        tar --exclude='node_modules' --exclude='.git' --exclude='.next' --exclude='dist' -czf - . | ssh -i \$SSH_KEY -o StrictHostKeyChecking=no ${SSH_USER}@${SERVER_IP} "tar -xzf - -C ${REMOTE_DIR}"
                        
                        # 3. Deploy using Docker Compose
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no ${SSH_USER}@${SERVER_IP} '
                            cd ${REMOTE_DIR}
                            # Create .env file if it doesn't exist
                            if [ ! -f .env ]; then
                                cp .env.example .env
                                echo "WARNING: Using .env.example. Please configure .env on the server."
                            fi
                            
                            docker compose down --remove-orphans
                            docker compose up -d --build
                            docker system prune -f
                        '
                    """
                }
            }
        }

        stage('Health Check') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ssh-root-server', keyFileVariable: 'SSH_KEY')]) {
                    sh """
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no ${SSH_USER}@${SERVER_IP} '
                            echo "Waiting for containers to start..."
                            sleep 20
                            
                            if [ \$(docker ps -q | wc -l) -gt 0 ]; then
                                echo "Containers are running!"
                                docker ps
                                exit 0
                            else
                                echo "No containers running!"
                                docker ps -a
                                docker logs VisiteHub-frontend || true
                                docker logs VisiteHub-backend || true
                                exit 1
                            fi
                        '
                    """
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
