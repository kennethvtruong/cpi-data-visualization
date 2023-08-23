# cpi-data-visualization

## Start up:
      npm run server
      npm start

![CPI Histogram App 2023-08-23 10-51-43](https://github.com/kennethvtruong/cpi-data-visualization/assets/58094034/160e59ee-ed76-481c-87af-2ee1de6dec78)

User is able to generate a graph. If the user clicks submit without editing the dates, it defaults to query the entire dataset.

![CPI Histogram App 2023-08-23 10-52-14](https://github.com/kennethvtruong/cpi-data-visualization/assets/58094034/3934886a-5222-4659-9938-447850f24aa1)

User is able to clear data.

![CPI Histogram App 2023-08-23 10-52-14 (1)](https://github.com/kennethvtruong/cpi-data-visualization/assets/58094034/ee6bd8d2-4e38-4abf-a71d-f099391a4b57)

If the user has a start date that is more recent than the end date, it will not generate a new graph until the mistakes have been rectified.

![CPI Histogram App 2023-08-23 10-52-14 (2)](https://github.com/kennethvtruong/cpi-data-visualization/assets/58094034/b7d5789f-ae39-4d3c-9b3f-9d5f7e76aa43)

User is able to change the sampling frequency from monthly, quarterly, and annual.


![CPI Histogram App 2023-08-23 10-53-26](https://github.com/kennethvtruong/cpi-data-visualization/assets/58094034/bb5a699a-1664-4ff5-8d96-bc004987e9b3)

The user is able to transform the data using the dropdown provided. Red bars indicate negative values while blue bars are positive ones (if applicable)

![CPI Histogram App - Google Chrome 2023-08-23 10-55-20](https://github.com/kennethvtruong/cpi-data-visualization/assets/58094034/69a4c21d-799d-434f-a76a-599d1e4710dd)

Though it generally isn't advisable for an Electron App to be able to accessed via web browsers like Google Chrome, for the purposes of the guidelines of the assignment it is accessible from this following [link](http://localhost:1212/) when the user uses the commands from above.
