# log-fog

A git/github log obfuscation tool.

## Description

`log-fog` is a tool that generates a script to create a large number of empty git commits with random, humorous messages. This can be used to obfuscate your git log and commit history on GitHub, making it difficult to see the real commits. It also provides a script to rewrite the history of a repository with a single commit.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/prodigic/log-fog.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd log-fog
    ```

## Usage

To generate the script that creates the fake commit history, run the following command:

```bash
node index.js
```

This will output a series of git commands to the console. You can then copy and paste these commands into your terminal to execute them.

To rewrite the history of a repository with a single commit, you can use the `single-rewrite.sh` script.

**Note:** The scripts are currently configured to use the `prodigic/log-fog` repository. You will need to modify the `GITHUB_ID` and `REPO_NAME` constants in `index.js` and `single-rewrite.sh` to use them with your own repository.

## ⚠️ Warning

This tool is intended for educational and experimental purposes only. Using this tool on a real repository will rewrite its history and may result in the loss of important data. Be very careful when using this tool and make sure you have a backup of your repository before proceeding.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
