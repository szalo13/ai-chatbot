AWS_PROFILE=letsremote
ECR_ID = 098079051172.dkr.ecr.eu-central-1.amazonaws.com
FUNCTION_NAME = create-faiss-model-from-txt

ecr-login:
	aws ecr get-login-password --region eu-central-1 --profile ${AWS_PROFILE} | docker login --username AWS --password-stdin ${ECR_ID}

tag:
	docker tag ${FUNCTION_NAME} ${ECR_ID}/${FUNCTION_NAME}:latest

push:
	make ecr-login
	make tag
	docker push ${ECR_ID}/${FUNCTION_NAME}:latest

build-docker:
	make build-docker-arm

build-docker-arm:
	docker buildx build --platform linux/amd64 -f ./Dockerfile -t ${FUNCTION_NAME}:latest . 

build-and-push:
	make build-docker
	make push