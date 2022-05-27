from django.shortcuts import render
from django.http import JsonResponse
from nltk.corpus import wordnet
import random
import json
import os


def definitions(request):
    info = json.loads(request.body)
    definitions = []
    word = info["word"]
    print(word)
    for syn in wordnet.synsets(word):
        # Limit the syns a bit because sometimes they're just
        # only words that are a bit related
        if word not in syn.name().lower():
            continue

        word_type = syn.lexname().split(".")[0]
        definition = syn.definition()
        examples = [e for e in syn.examples() if word in e.lower()]
        definitions.append({'type': word_type,
                            'definition': definition,
                            'examples': examples})
    return JsonResponse({'word': word, 'definitions': definitions})


def findword(request):
    info = json.loads(request.body)

    filepath = os.path.abspath(os.path.dirname(__file__)) + "/wordsrawsorted.json"
    with open(filepath) as f:
        words = json.load(f)["words"]

    word = 'A'
    while word[0].isupper():
        index = random.randint(info["min"], info["max"])
        word = words[index]

        # For debugging (-:
        # word = 'descending'
        # word = 'heap'

    # word = "across"
    return JsonResponse({'word': word, 'rank': index})
