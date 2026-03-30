#!/usr/bin/env bash
set -euo pipefail

DEFAULT_DIRS=("$HOME/Desktop" "$HOME/Documents" "$HOME/Downloads")

if [ "$#" -gt 0 ]; then
  TARGET_DIRS=("$@")
else
  TARGET_DIRS=("${DEFAULT_DIRS[@]}")
fi

IMAGE_EXT_REGEX='\.(png|jpe?g|gif|bmp|webp|tiff?|heic|svg)$'

is_screenshot_or_ai() {
  local path_lower
  path_lower="$(printf '%s' "$1" | tr '[:upper:]' '[:lower:]')"

  [[ "$path_lower" =~ screenshot|screen[[:space:]_-]?shot|screencap|screen[[:space:]_-]?capture|snip|snipping|capture ]] \
    || [[ "$path_lower" =~ (^|[[:space:]_.-])(ai|generated|genai|dalle|midjourney|stable[[:space:]_.-]?diffusion|chatgpt)($|[[:space:]_.-]) ]]
}

move_file_safely() {
  local src="$1"
  local dest_dir="$2"
  local filename dest_path base ext counter

  filename="$(basename "$src")"
  dest_path="$dest_dir/$filename"

  if [ ! -e "$dest_path" ]; then
    mv "$src" "$dest_path"
    return
  fi

  base="${filename%.*}"
  ext="${filename##*.}"
  if [ "$base" = "$filename" ]; then
    ext=""
  else
    ext=".$ext"
  fi

  counter=1
  while [ -e "$dest_dir/${base}_${counter}${ext}" ]; do
    counter=$((counter + 1))
  done

  mv "$src" "$dest_dir/${base}_${counter}${ext}"
}

for dir in "${TARGET_DIRS[@]}"; do
  if [ ! -d "$dir" ]; then
    echo "Skipping missing directory: $dir"
    continue
  fi

  screenshots_ai_dir="$dir/Images/Screenshots_AI"
  other_images_dir="$dir/Images/Other"
  mkdir -p "$screenshots_ai_dir" "$other_images_dir"

  while IFS= read -r -d '' file; do
    if is_screenshot_or_ai "$file"; then
      move_file_safely "$file" "$screenshots_ai_dir"
      echo "Moved to Screenshots_AI: $file"
    else
      move_file_safely "$file" "$other_images_dir"
      echo "Moved to Other: $file"
    fi
  done < <(find "$dir" -type f -iregex ".*${IMAGE_EXT_REGEX}" \
      ! -path "$screenshots_ai_dir/*" \
      ! -path "$other_images_dir/*" \
      -print0)
done
