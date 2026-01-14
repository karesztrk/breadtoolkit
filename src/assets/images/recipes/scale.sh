for file in *.jpg; do
    magick "$file" -resize 1024x -quality 65 -strip "${file%.jpg}_scaled.jpg"
done
