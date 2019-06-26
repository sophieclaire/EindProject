import json

in_file_path='/Users/Sophie1/Desktop/EindProject/data/CHN.json'

with open(in_file_path,'r') as data:

    # Read the file and convert it to a dictionary
    china = json.load(data)
    #dict.to_dict()
    #print(dict.type)


    years = ['Y2013', 'Y2012', 'Y2011', 'Y2010', 'Y2009', 'Y2008', 'Y2007', 'Y2006', 'Y2005', 'Y2004', 'Y2003', 'Y2002', 'Y2001']
    for year in years:
        sum = 0;
        for item in china:
                sum += item[year]
        print(year)
        print(sum)




# filename='CHN1.json'
# path = 'data/[filename]'
# filePathNameWExt = './data/' + filename

# with open(filePathNameWExt, 'w') as out_json_file:
#     # Save each obj to their respective filepath
#     #for i in range(len(data)):
#     json.dump(list, out_json_file, indent=4)
        #
        # with open(filePathNameWExt, 'w') as out_json_file:
        #     # Save each obj to their respective filepath
        #     #for i in range(len(data)):
        #     json.dump(data, out_json_file, indent=4)
