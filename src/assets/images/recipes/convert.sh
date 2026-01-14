for file in *.jpg; do
    magick "$file" -quality 50 "${file%.jpg}.avif"
done
