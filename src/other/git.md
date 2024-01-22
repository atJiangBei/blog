## git add

将某些文件提交到暂存区

```sh
# 提交全部
git add .

# 同上
git add -A
git add -all

# 提交a.js和b.js
git add a.js b.js

```

## git commit

将暂存区内容提交到版本库

```sh
# 将暂存区内容提交到版本库
git commit -m"message"

# 将某些已被跟踪的文件提交到版本库
git commit a.js b.js

# 跳过git add，将所有已被跟踪的文件更改提交到版本库
git commit -am"message"

# 使用一次新的commit 替代上一次的提交
# 如果代码没有任何变化，则用来改上一次commit的提交信息
git commit --amend -m"message"
```

## git pull

```sh
# git pull = git fetch + git merge
#当前分支自动与唯一一个追踪分支进行合并。
git pull

#本地的当前分支自动与对应的 origin 主机 “追踪分支” 进行合并。
git pull origin

#取回 origin/next 分支，再与当前分支合并。
git pull origin next

#取回 origin 主机的 next 分支，与本地的 master 分支合并。
git pull origin next:master

```

## git push

## git fetch

## git rm

### git rm -r --cached .vitepress/dist

删除已被上传到远程仓库的文件

```sh
# 项目第一次提交时.gitignore内未忽略dist文件夹，导致已建立关联

git rm -r --cached .vitepress/dist

git commit -m"提交信息"

git push

```
