#!/bin/bash

# Create directory if it doesn't exist
mkdir -p public/images/menu

# Generate placeholder images for menu items
convert -size 800x800 gradient:teal-dark-teal -gravity center -pointsize 48 -fill white -annotate 0 "Espresso\nRich & Concentrated" public/images/menu/espresso.jpg
convert -size 800x800 gradient:teal-dark-teal -gravity center -pointsize 48 -fill white -annotate 0 "Cappuccino\nPerfect Balance" public/images/menu/cappuccino.jpg
convert -size 800x800 gradient:teal-dark-teal -gravity center -pointsize 48 -fill white -annotate 0 "Latte\nSmooth & Creamy" public/images/menu/latte.jpg
convert -size 800x800 gradient:teal-dark-teal -gravity center -pointsize 48 -fill white -annotate 0 "Mocha\nChocolate Delight" public/images/menu/mocha.jpg
convert -size 800x800 gradient:teal-dark-teal -gravity center -pointsize 48 -fill white -annotate 0 "Iced Americano\nRefreshing" public/images/menu/iced-americano.jpg
convert -size 800x800 gradient:teal-dark-teal -gravity center -pointsize 48 -fill white -annotate 0 "Cold Brew\nSmooth & Bold" public/images/menu/cold-brew.jpg

echo "Generated menu placeholder images in public/images/menu/" 