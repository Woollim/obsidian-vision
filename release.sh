#!/bin/bash

# 버전 업데이트 및 태그 생성 스크립트

if [ $# -eq 0 ]; then
    echo "Usage: ./release.sh <version>"
    echo "Example: ./release.sh 1.0.1"
    exit 1
fi

VERSION=$1

echo "Updating version to $VERSION..."

# package.json 버전 업데이트 (첫 번째 "version"만)
sed -i '' "3s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json

# manifest.json 버전 업데이트  
sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" manifest.json

# package-lock.json은 gitignore 처리되어 있으므로 스킵

echo "Files updated successfully:"
echo "- package.json"
echo "- manifest.json"

# Git에 변경사항 추가
git add package.json manifest.json

# 변경사항 커밋
git commit -m "bump version to $VERSION"

# 태그 생성
git tag $VERSION

echo "Tag $VERSION created successfully!"
echo "Now run 'git push && git push --tags' to deploy."