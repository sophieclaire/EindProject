import json

in_file_path='/Users/Sophie1/Desktop/EindProject/data/CHN.json'

with open(in_file_path,'r') as data:

    # Read the file and convert it to a dictionary
    china = json.load(data)
    #dict.to_dict()
    #print(dict.type)

    items_food = []
    name_food = []

    years = ['Y2013', 'Y2012', 'Y2011', 'Y2010', 'Y2009', 'Y2008', 'Y2007', 'Y2006', 'Y2005', 'Y2004', 'Y2003', 'Y2002', 'Y2001']
    for year in years:
        sum = 0;

        for item in china:
            if item['Element'] == 'Food':
                if item['Item'] in name_food:
                    for i in range(len(items_food)):
                        if items_food[i]['Item'] == item['Item']:
                            if items_food[i][year] > item[year]:
                                print(items_food[i][year], '>', item[year])
                                continue
                            else:
                                del items_food[i]
                                name_food.remove(item['Item'])
                                items_food.append(item)
                                name_food.append(item['Item'])
                                sum -= items_food[i][year]
                                sum += item[year]
                else:
                    items_food.append(item)
                    name_food.append(item['Item'])
                    sum += item[year]

        items_feed = []
        name_feed = []

        for item in china:
            if item['Element'] == 'Feed':
                if item['Item'] in name_feed:
                    for i in range(len(items_feed)):
                        if items_feed[i]['Item'] == item['Item']:
                                if items_feed[i][year] > item[year]:
                                    print(items_feed[i][year], '>', item[year])
                                    continue
                                else:
                                    del items_feed[i]
                                    name_feed.remove(item['Item'])
                                    items_feed.append(item)
                                    name_feed.append(item['Item'])
                                    sum -= items_food[i][year]
                                    sum += item[year]
                else:
                    items_feed.append(item)
                    name_feed.append(item['Item'])
                    sum += item[year]
        print(year)
        print(sum)


        list = items_feed + items_food


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
