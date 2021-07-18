# unkbot

## How to use the bot
Cerate a bot from the discord developer portal.
Create a config.json: 
```json
    {
        "token": "Your Token"
    }
```
within seq2seq/data put in the chat data in form of: 
```
q: do you like pancakes?
a: no, I like waffles 
``` 

Then use: 
```bash
python3 data.py 
```
which will give three files: `idx_a.npy`, `idx_q.npy` and `metadata.pkl`

### Training The bot

`python3 main.py`

This allows to you to use the `infer.py`, which generates the answers
