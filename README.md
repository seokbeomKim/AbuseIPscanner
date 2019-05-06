# AbuseIPScanner
A log file watcher using other web sites.
This is a small monitoring tool for my personal server, 
but I could not find the one. 

## Usage

### Requirements

The application requires Node.js runtime environment. 
In development environment, the version of Node.js is `v11.10.0`. 
If you have any problems with running it, please let me know through the Issue tracker.

You can check the version with:

```bash
$ node --version
```

### Installation

You can download the code  with:

```bash
$ git clone https://github.com/seokbeomKim/AbuseIPscanner
```

After clone the code, install dependencies with `npm` or `yarn` and 
compile typescript codes with 

```bash
$ node_modules/typescript/bin/tsc
```

### Run

```bash
# Copy configuration file
$ cp .config.json.example ~/.abuseipscanners

# Run application
$ node main
```

#### Arguments
There are few arguments available. 

### Configuration
You can check the configuration file: `.config.json.example`

```json
{
  "files": [
    {
      "filepath": "./logs",
      "rules": [
        "apache_log",
        "test_log"
      ]
    }
  ],
  "dbSite": [
    {
      "name": "abuseipdb",
      "url": "https://www.abuseipdb.com/check/",
      "cheerio": "#report-wrapper > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h3:nth-child(1)",
      "suspicious": "was found",
      "method": "get"
    },
    {
      "name": "ipvoid.com",
      "url": "https://www.ipvoid.com/ip-blacklist-check/",
      "cheerio": ".table-striped .label-success",
      "suspicious": "blacklisted",
      "method": "post",
      "payload": "ip"
    }
  ],
  "rules": [
    {
      "name": "Apache access log",
      "id": "apache_log",
      "token": " ",
      "index": "0",
      "regex_match": "log_1",
      "commands": [
        "./test/echo.sh",
        "./test/logger.sh"
      ]
    },
    {
      "name": "Test access log",
      "id": "test_log",
      "token": "-",
      "index": "2",
      "regex_match": "_2",
      "commands": []
    }
  ]
}
```
#### Files
Set a file(directory or regular file) path to watch.
```json
{
    "files": [
        {
          "filepath": "./logs",
          "rules": [
            "apache_log",
            "test_log"
          ]
        }
      ],
}
```

#### Rules
This is a rule to parse log file. 

```json
{
    "rules": [
        {
          "name": "Apache access log",
          "id": "apache_log",
          "token": " ",
          "index": "0",
          "regex_match": "log_1",
          "commands": [
            "./test/echo.sh",
            "./test/logger.sh"
          ]
        },
        {
          "name": "Test access log",
          "id": "test_log",
          "token": "-",
          "index": "2",
          "regex_match": "_2",
          "commands": []
        }
      ]
}
```
For example, if the log file has a form like -

```text
200.206.200.179 - - [05/May/2019:00:58:11 +0900] "GET / HTTP/1.1" 302 -
200.206.200.179 - - [05/May/2019:00:58:11 +0900] "GET / HTTP/1.1" 302 -
103.73.157.162 - - [05/May/2019:01:28:20 +0900] "GET /xmlrpc.php HTTP/1.1" 404 1015
103.73.157.162 - - [05/May/2019:01:28:21 +0900] "HEAD /xmlrpc.php HTTP/1.1" 404 -
```

the line can be splited with token `(empty space)` 
and we can find the ip address from splited items with index `0(zero)`.

* id: id of rule (should be unique)
* token: token for line splitting
* index: index of ip address when the line is split.
* regex_match: filename match regular expression. If you use the rule with directory file configuration as
    ```json
    "files": [
        {
          "filepath": "./logs",
          "rules": [
            "apache_log",
            "test_log"
          ]
        }
      ],
    ```
    there might be multiple files like `./logs/log_file_type_1`, `./logs/log-file_type_2`, ... and so on. 
    In that case, you can set a rule with regular expression of filename.
    
* commands: run to commands 
    
  When the application finds that the IP address has been reported to database sites, 
it executes the commands what you configured.       

#### DbSite
There are many sites to share suspicious IP address such as abuseipdb.com, ipvoid.com, ... and so on. 
The application mainly use `crawling method(with cheerio)` to determine if the IP address is suspicious.
It is not easy to figure out the exact rule for that, but if you want to add some sites, you can add it to configuration file.


```json
"dbSite": [
    {
      "name": "abuseipdb",
      "url": "https://www.abuseipdb.com/check/",
      "cheerio": "#report-wrapper > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h3:nth-child(1)",
      "suspicious": "was found",
      "method": "get"
    },
    {
      "name": "ipvoid.com",
      "url": "https://www.ipvoid.com/ip-blacklist-check/",
      "cheerio": ".table-striped .label-success",
      "suspicious": "blacklisted",
      "method": "post",
      "payload": "ip"
    }
  ],
``` 

## Author
김석범(Sukbeom Kim), sukbeom.kim@gmail.com

For me, This is a small project and a kind of learning project. 
You can use and modify the source freely or any requirements, PR would be greeting.
 