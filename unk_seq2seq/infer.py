import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from main import * # import the main python file with model from the example
import time
import tensorlayer as tl
import json 

load_weights = tl.files.load_npz(name='saved/unk-model.npz')
tl.files.assign_weights(load_weights, model_)

top_n = 3

def respond(input):
    sentence = inference(input, top_n)
    response=' '.join(sentence)
    return response

'''while True:
    userInput = input("Query > ")
    for i in range(top_n):
        print("bot# ", respond(userInput))'''

q_file = open(r'/mnt/d/dev/unkbot/bot/query.json', "r")
query = json.loads(q_file.read())
q_file.close()

query["answer"] = respond(query["question"])
print(query["question"], query["answer"])

print(query)

q_file = open(r'/mnt/d/dev/unkbot/bot/query.json', 'w')
value = json.dumps(query)
q_file.write(value)




