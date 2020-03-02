#!/bin/bash

main() {
	# Only master
	if [[ "$TRAVIS_BRANCH" != "master" ]];then
		echo -e "Not master, skip deploy www\n"
		return 0
	fi

	github_repo="GKD-OW/tools"
	github_branch="gh-pages"
	
	cd $TRAVIS_BUILD_DIR
	mkdir dist

	# Build
	cd $TRAVIS_BUILD_DIR/qrcode
	yarn install
	yarn run build
	cp -r $TRAVIS_BUILD_DIR/qrcode/dist $TRAVIS_BUILD_DIR/dist/qrcode

	# Copy all files
	cp $TRAVIS_BUILD_DIR/ci/www/* $TRAVIS_BUILD_DIR/dist

	# Upload
	cd $TRAVIS_BUILD_DIR/dist
	git init
	git config user.name "Deployment Bot"
	git config user.email "deploy@travis-ci.org"
	git add .
	git commit -m "Automatic deployment"
	git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${github_repo}.git" master:$github_branch
}

main