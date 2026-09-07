# Решение: публикация Astro через GitHub Pages

- Дата: 2026-09-07
- Статус: опубликовано и проверено в runtime
- Область: `shch.one`, репозиторий `shch-space`

## Проверенный контекст

- `https://shch.one/` отвечает заголовком `server: GitHub.com`.
- Действующий в `origin/master` workflow публикует сайт через GitHub Pages.
- Локально описанный S3-контур не настроен: `s3cmd` и конфигурация отсутствуют.
- Astro получает авторский контент из локальной папки Obsidian, недоступной
  GitHub-hosted runner.

## Решение

- Хранить в `content/` версионируемый снимок Obsidian для воспроизводимой CI-сборки.
- Локально сохранять приоритет `OBSIDIAN_VAULT_PATH`.
- Обновлять снимок командой `pnpm content:sync` перед релизом.
- Собирать и публиковать `dist/` через GitHub Pages Actions.
- Обычный push не публикует сайт: нужен ручной запуск или маркер `[deploy]` в
  сообщении коммита.

## Откат

Исходная точка отката — commit `71fa6497998f852238ed08ae65b416408b751caa`.
При ошибке нужно повторно опубликовать сборку этой ревизии или откатить релизный
commit и запустить workflow с явным deploy-маркером.

## Результат релиза

- Initial release commit: `7dfd8fbb9289b4eb2b0be34b3584b8b0d24be626`.
- GitHub Pages опубликовал Astro-сборку 2026-09-07.
- Все 51 публичных файла побайтно совпали с локальным `dist/`.
- Главная, блокнот, проектные страницы и магазин отвечают `200`.
- `/notes/website-story/` отвечает `404`; запись отсутствует в `/notes/`.
- Alias `/projects/sword-moscow-2024/` сохранил canonical на
  `/projects/mech-moscow-2024/`.
- Первый post-release audit обнаружил уязвимые транзитивные `picomatch@2.3.1` и
  `picomatch@4.0.3`.
- Patch-release `b1b9b2c6e52be6a6f199005708545bb2247e4c48` обновил Picomatch,
  PostCSS, Autoprefixer, Browserslist и PostCSS Selector Parser.
- После patch-release полный `pnpm audit` сообщает `No known vulnerabilities`.
- Повторная runtime-проверка: 51 из 51 публичных файлов совпали с `dist/`,
  удалённая страница по-прежнему отвечает `404`.
