less:
	./node_modules/less/bin/lessc  styles/index.less build/css/index.css

serve:
	npm run serve

build:
	npm run build

docker-build:
	docker build -t gandalf .

docker-tag:
	docker tag gandalf:latest gandalf:staging