# Icons and brand marks for the homepage 2D diagrams

Upstream, each `.svg` is inlined as a `<symbol id="diagram-icon-<file name>">` by
`themes/bigspring/layouts/partials/home/diagram-assets.html` and drawn by
`themes/bigspring/assets/js/diagrams.js`. Files are kept exactly as published;
the template prefixes their ids and classes when it inlines them. Every mark
belongs to its owner and is used only to show that Dapr works with that product.

This directory in the Chinese community site contains only the twenty
`fluent-*.svg` files, used as static images. The table below is the original
upstream attribution: the generated diagrams in `../diagrams/` also embed some
of these vendor and language marks. Files and marks are not recolored.

| Files | Source | Terms |
| --- | --- | --- |
| `apachekafka.svg`, `rabbitmq.svg`, `redis.svg`, `hashicorp-vault.svg` (Simple Icons "Vault"), `kubernetes.svg` | [Simple Icons](https://simpleicons.org) 13.21.0 | CC0 1.0; the marks remain trademarks of their owners |
| `azure-service-bus.svg`, `azure-key-vault.svg`, `azure-cosmos-db.svg` | [Azure architecture icons](https://learn.microsoft.com/azure/architecture/icons/) V24 | Permitted in architecture diagrams, training material and documentation; do not crop, flip, rotate, distort or recolor |
| `amazon-sns.svg`, `aws-kms.svg`, `amazon-dynamodb.svg` | [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/), package 2026-07-31, `Architecture-Service-Icons/*/64` | Permitted for architecture diagrams |
| `google-cloud-pubsub.svg`, `google-cloud-secret-manager.svg`, `google-cloud-firestore.svg` | [Google Cloud icons](https://cloud.google.com/icons), legacy icon set | Google Cloud's icon library for architecture diagrams |
| `azure.svg` | Wikimedia Commons, [Microsoft_Azure.svg](https://commons.wikimedia.org/wiki/File:Microsoft_Azure.svg) | Public domain; trademark of Microsoft |
| `aws.svg` | Wikimedia Commons, [Amazon_Web_Services_Logo.svg](https://commons.wikimedia.org/wiki/File:Amazon_Web_Services_Logo.svg) | Apache License 2.0; trademark of Amazon |
| `googlecloud.svg` | Wikimedia Commons, [Google_Cloud_logo.svg](https://commons.wikimedia.org/wiki/File:Google_Cloud_logo.svg) | Public domain; trademark of Google |
| `nodejs.svg` | Wikimedia Commons, [Node.js_logo.svg](https://commons.wikimedia.org/wiki/File:Node.js_logo.svg) | MIT; trademark of the OpenJS Foundation |
| `python.svg` | Wikimedia Commons, [Python-logo-notext.svg](https://commons.wikimedia.org/wiki/File:Python-logo-notext.svg) | Public domain; trademark of the Python Software Foundation |
| `dotnet.svg` | Wikimedia Commons, [.NET_Logo.svg](https://commons.wikimedia.org/wiki/File:.NET_Logo.svg) | Public domain; trademark of Microsoft |
| `go.svg` | Wikimedia Commons, [Go_Logo_Blue.svg](https://commons.wikimedia.org/wiki/File:Go_Logo_Blue.svg) | Public domain; trademark of Google |
| `php.svg` | Wikimedia Commons, [PHP-logo.svg](https://commons.wikimedia.org/wiki/File:PHP-logo.svg) | Public domain |
| `rust.svg` | Wikimedia Commons, [Rust_programming_language_black_logo.svg](https://commons.wikimedia.org/wiki/File:Rust_programming_language_black_logo.svg), by the Rust Foundation | CC BY 4.0, credited here; trademark of the Rust Foundation |
| `java.svg` | English Wikipedia, [Java_programming_language_logo.svg](https://en.wikipedia.org/wiki/File:Java_programming_language_logo.svg) | Not freely licensed: Wikipedia hosts it as fair use. Copyright and trademark of Oracle. Used at the maintainers' request, as the earlier APIs overview image did |
| `fluent-*.svg` (24px regular) | [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons), via the [Iconify API](https://api.iconify.design) (`/fluent/<name>-24-regular.svg`), the set the homepage's API cards already use | MIT; drawn in `currentColor`, so `icon()` colors them |

The languages' and cloud providers' logos in the APIs overview are their own
designs, from Wikimedia, as the maintainers asked. The integrate diagram names
its platforms in text instead.

To add a mark, drop the vendor's file here as `<name>.svg` and reference it as
`icon(parent, { name: '<name>', ... })` in a scene.

## Fluent UI System Icons license

MIT License

Copyright (c) Microsoft Corporation. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
