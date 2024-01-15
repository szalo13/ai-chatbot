SHELL := /usr/bin/env sh

default_region=eu-central-1
company=letsremote
docker_repo=098079051172.dkr.ecr.eu-central-1.amazonaws.com
image_name=$(company)_faiss_model_from_txt
version_commit_hash = $(if ${CI},${CI_COMMIT_SHORT_SHA},$(shell git rev-parse --short=8 HEAD))
version_tag = $(or ${VERSION}, $(version_commit_hash))
stage = $(or ${STAGE}, dev)

ecs_cluster=$(company)_$(stage)
service_name=$(company)_$(stage)_ai_chatbot
task_family=$(stage)_ai_chatbot

public_image_name = $(docker_repo)/$(image_name):$(version_tag)

login:
	AWS_PROFILE=$(company) aws ecr get-login-password --region $(default_region) | docker login --username AWS --password-stdin $(docker_repo)

build-docker:
	AWS_PROFILE=$(company) [[ "$(shell uname -m)" == "arm64" ]] && { make build-docker-arm64 || exit 1; } || make build-docker-x86

build-docker-arm64:
	echo [build-docker arm64] Building docker of api and publishing
	docker buildx build --platform linux/amd64,linux/arm64 --push -t $(public_image_name) .

build-docker-x86:
	echo [build-docker x86] Building docker of api
	docker build -t $(public_image_name) .
	echo [publish-docker] Publishing docker of api
	docker push $(public_image_name)

deploy:
	[[ -z "${CI}" ]] && { make deploy-local || exit 1; } || make deploy-ci

deploy-local:
	echo [Deploy] Deploying $(service_name), $(version_tag) to $(stage)
	echo [Disclaimer] Mapping local aws configuration to deployment container
	docker run -v ~/.aws/:/root/.aws \
	fabfuel/ecs-deploy:1.10.2 ecs deploy $(ecs_cluster) $(service_name) -t $(version_tag) --task $(task_family) \
	--profile $(company) --region $(default_region)

deploy-ci:
	echo [Deploy] Deploying $(service_name), $(version_tag) to $(stage)
	ecs deploy $(ecs_cluster) $(service_name) -t $(version_tag) --task $(task_family)
