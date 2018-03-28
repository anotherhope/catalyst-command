# Command Project

Little helper maker

### Installing

```
npm install florenthagard/command
```

### Example

```javascript
const command = require('command');
      command.register([{
          "description" : "Line0" || ["line1","line2"],      // String || Array   Description of the command
          "short"       : "l",                               // String            Define Short Argument
          "long"        : "logLevel",                        // String            Define Long Argument
          "default"     : "log",                             // String            Define default choice
          "values"      : ["choice0","choice1","choice2"],   // Array             list of possible values
          "context"     : "Logger"                           // String            Groupe by
    }]);
```

## Authors

* **Hagard Florent** - *Initial work* - [Florent](https://github.com/florenthagard/command)

## License

This project is licensed under the GNU 3.0 License - see the [LICENSE](LICENSE) file for details