pipeline {
    agent any
    
    environment {
        REMOTE_HOST = '3.131.137.248'
        REMOTE_USER = 'ubuntu'
        SSH_KEY = credentials('nextjs-server')
    }
    
    stages {
        stage('connect with the server') {
            steps {
                script {
                    sh '''#!/bin/bash
                    ssh -i "$SSH_KEY" $REMOTE_USER@$REMOTE_HOST "\
                    cd /home/ubuntu/nextjs-firebase-authentication && \
                    git pull origin dev && npm install && \
                    sudo npm run build && pm2 restart nextjs-app"
                    '''
                }
            }
        }
        
        // Add more stages as needed
    }
    
    // Post-build actions or notifications can be added here
}
