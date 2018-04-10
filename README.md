# compose-pkg-showdown

Markdown viewer package for the \compose\ platform.


## Documents location

Showdown will show all the documents contained in the directory `documents`
available in the `public` data folder of the package, which is

```
/data/showdown/documents/
```

For the remainder of this documentation, we will refer to this
location as `docs-root`.
The main page, loaded when no page is specified is `index.md`.
If `index.md` does not exists, a warning message will be shown.

The `docs-root` directory must store all the Markdown files in the
main level. Images can be stored under the subdirectory `images/`.


### Add Images to your Markdown files

Adding an image to your Markdown files is as easy as you expect.
Just write

```
[<align>] images/<image_file>)
```

For example, you can add the image `example.jpg` that resides in `images/`
to your Markdown file and align it to the `right` by using the syntax:

```
[right] images/example.jpg)
```


## Acknowledgments

This package uses the [showdown](http://www.showdownjs.com/) library.
