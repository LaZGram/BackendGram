#!/bin/bash

# Source file
SOURCE="database/schema.prisma"

# Destination directories
DEST_DIRS="services/*/prisma"

# Copy the source file to each destination directory
for DEST in $DEST_DIRS; do
    if [ -d "$DEST" ]; then
        cp "$SOURCE" "$DEST/schema.prisma"
        echo "Copied $SOURCE to $DEST/schema.prisma"
        # (cd "$DEST" && npx prisma generate)
    else
        echo "Directory $DEST does not exist"
    fi
done