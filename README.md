# torrent-client

A light weight CLI client written in Node.js to download torrent files. This internally uses the `torrent-stream` package to stream the files from torrents.

For detailed information check the github [repo](https://github.com/anik-ghosh-au7/torrent-client).

## Getting Started

Here is a quick guide on getting started with the `torrent-client` tool.

### Usage

```sh
npx torrent-client --add<Torrent File | Magnet Link> --path <Download Path>
```

### Help

```sh
A light weight command-line tool to download torrent files

Options:
      --version  Show version number                                   [boolean]
  -a, --add      Add a torrent file or magnet link           [string] [required]
  -p, --path     Path to download the file(s)                           [string]
      --help     Show help                                             [boolean]

```

## Please Note:

Torrents are a method of peer-to-peer (P2P) file sharing, which means that files are shared directly between users rather than being hosted on a central server. While this can be a convenient way to download large files, it also means that users may be downloading copyrighted material without permission.

It's important to note that downloading copyrighted material without permission is illegal in many countries and could result in fines or legal action. Additionally, downloading copyrighted material through torrents puts the user at risk of malware and other malicious software.

It's important to use a reputable VPN service and always use caution when downloading files through torrents. It's also recommended to use a malware scanner to check downloaded files for any malicious software.

It is always recommended to use legal sources to download content. And if you are unsure whether the content you're downloading is copyrighted or not, it's best to err on the side of caution and not download it.
