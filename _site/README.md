naotoizu7010.github.io

# thank you
https://note.com/kaze3desu/n/nd10ce74e0508

https://qiita.com/TAKANEKOMACHI/items/5d30e499c9dddbea4421

https://zenn.dev/entaku/articles/f5b87912475a27

https://note.com/wecken/n/n0f9cdb00c1f4

### ローカルで実行したいとき
`bundle exec jekyll serve`


# { name } resume

## Sample

https://github.com/kawamataryo/resume

## Features

### 💅 Lint text

Automatic proofreading with [textlint](https://github.com/textlint/textlint).

```
$ yarn lint --fix
```
It is also automatically executed when pre-commit by [husky](https://github.com/typicode/husky).  
proofreading rules are set with `.textlintrc`.



### 📝 Convert MD to PDF

You can generate PDF with [md-to-pdf](https://www.npmjs.com/package/md-to-pdf).


```
$ yarn build:pdf
```

The output PDF can be styled as you like with CSS. Edit the `pdf-configs/style.css`.  

### 🛠 Create release

When you push with a `v**` tag, GitHub Actions will run the build, generate the PDF, create a Release, and register the PDF to Assets.

```
$ git commit -m "add job"
$ git tag v1.0
$ git push origin --tags
```

### 📆 Remind update

Automatically generate issues every three months with GitHub Actions Schedules triggers to prompt you to update your resume.

To change the duration or stop the job, edit `.github/workflows/create-issue.yml`.  
To change the issue contents, edit `.github/ISSUE_TEMPLATE.md`.
