from django.shortcuts import render
from django.http import JsonResponse
from nltk.corpus import wordnet
import random
import json
import os


def get_definitions(word):
    definitions = []
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

    return definitions


def findwords(request):
    info = json.loads(request.body)

    filepath = os.path.abspath(os.path.dirname(__file__)) + "/wordsrawsorted.json"
    with open(filepath) as f:
        words = json.load(f)["words"]

    definitions = []
    word = 'A'
    while (not definitions) or word[0].isupper():
        index = random.randint(info["min"], info["max"])
        word = words[index]

        # For debugging (-:
        word = 'descending'

        definitions = get_definitions(word)

    # word = "across"
    return JsonResponse({'word': word, 'rank': index,
                         'definitions': definitions})
