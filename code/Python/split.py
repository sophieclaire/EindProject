import json

in_file_path='/Users/Sophie1/Desktop/EindProject/data.json'

with open(in_file_path,'r') as data:

    # Read the file and convert it to a dictionary
    dict = json.load(data)
    #dict.to_dict()
    #print(dict.type)


    for country in dict:
        #print(country)
        #yearly_production = {}
        data = json.loads(dict[country])
        if country == 'NLD':
            print(data[0])
            print(len(data))

            print("NLD NLD")
            print("\n\n")
        filename=country+'.json'
        path = 'data/[filename]'
        filePathNameWExt = './data/' + filename

        with open(filePathNameWExt, 'w') as out_json_file:
            # Save each obj to their respective filepath
            #for i in range(len(data)):
            json.dump(data, out_json_file, indent=4)
