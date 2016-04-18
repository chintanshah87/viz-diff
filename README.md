# viz-diff
This library is a wrapper of blink-diff which can perform execution on multiple PNG files against Baseline images.

**Table of Contents**
* [Usage](#usage)
    * [Configuration](#configuration)
    * [Setup Folders with PNG Files](#setup-folders-with-png-files)
    * [Execute & Verify](#execute-and-verify)
* [Acknowledgement](#acknowledgement)
* [Contributor](#contributor)
* [License](#license)

## Usage
The aim of this library is to be able to perform visual testing on local system for multiple images and generate output for whole bunch of files. This comes handy when you have list of pages/functionality to perform visual test and have very less time for verification.

This can be used in 3 simple steps:
- Configuration
- Setup Folder with PNG Files
- Execute and Verify

### Configuration
In the root directory *config.json* contains very basic configurations.

````JSON
{
"BaselineImagePath": "./BaselineImages",
"WebImagePath": "./WebImages",
"OutputPath": "./Output",
"Threshold": "1",
"Delta": "30",
"hShift": "0",
"vShift": "0",
"perceptual":"true",
"hideShift": "false",
"gamma": "0"
}
````
- *BaselineImagePath:* Directory reference containing ImageA (baseline) PNG files.
- *WebImagePath:* Directory reference containing ImageB (implementation) PNG files.
- *Output:* Directory reference for output file and log
- *Threshold:* 'Percent' as type of threshold 
- *Delta:* Distance colors in the 4 dimensional color-space

### Setup Folders with PNG Files
Keep file name same across BaselineImages & WebImages directory as during execution file having name in BaselineImages will be searched in WebImages directory and executio will be perfoemed.

You can add as many files as you want in both the directories

### Execute and Verify
Execute run-viz-diff.bat file to start the execution.

You will notice command prompt which will show the execution status. Upon completion, it will close by itself.

Navigate to Output directory folder and verify the images. 

You can also check *ExecutionLog.log* file for more detail.

## Acknowledgement
All credit goes to [Yahoo](https://github.com/yahoo) & [marcelerz](https://github.com/marcelerz) for creating such a wonderful library [blink-diff](https://github.com/yahoo/blink-diff/).

## Contributor
- [chintanshah87](https://github.com/chintanshah87)

## License
[MIT License - blink-diff](https://github.com/yahoo/blink-diff/blob/master/LICENSE)
