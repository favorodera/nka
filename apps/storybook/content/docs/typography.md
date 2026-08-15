<!--  eslint-disable md/fenced-code-language  -->

# Heading Level 1 `inline code`

## Heading Level 2 `inline code`

### Heading Level 3 `inline code`

#### Heading Level 4 `inline code`

##### Heading Level 5 `inline code`

###### Heading Level 6 `inline code`

## Paragraphs & Line Breaks

This is a plain paragraph [^1] with regular text. It should wrap normally and contain no special formatting at all, just to check baseline prose rendering.

This is a second paragraph, separated from the first by a blank line, to confirm the parser correctly detects paragraph breaks.

This line ends with two trailing spaces to force a hard line break.
And this is the next line, which should appear directly below without an extra blank line gap.

## Emphasis

Plain text, *italic text*, **bold text**, ***bold italic text***, <mark>highlighted text</mark>, and ~~strikethrough text~~.

Mixed inline: **bold with *nested italic* inside**, and a sentence with `inline code` alongside **bold** and *italic*.

## Keyboard keys
Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.


## Blockquotes

> A simple single-line blockquote.

> A multi-line blockquote
> that continues across
> several lines of text.

> Level one blockquote.
>> Level two nested blockquote.
>>> Level three nested blockquote.

> Blockquote containing **bold**, *italic*, and a [link](https://example.com).
>
> - A list item inside a blockquote
> - Another item inside a blockquote
>
> ```
> a code block inside a blockquote
> ```

## Lists

### Unordered

- First item
- Second item
- Third item with **bold** and *italic* text
  - Nested item one
  - Nested item two
    - Deeply nested item
- Fourth item back at top level

### Ordered

1. First step
2. Second step
3. Third step
  1. Sub-step A
  2. Sub-step B
4. Fourth step

### Mixed Nesting

1. Ordered item
  - Unordered sub-item
  - Another unordered sub-item
2. Another ordered item
  1. Nested ordered sub-item
    - Deeply nested unordered item

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task
  - [x] Completed sub-task
  - [ ] Incomplete sub-task

### Details

<details>
<summary>Click to reveal more information</summary>
This content is hidden by default and only appears when expanded.
</details>

### Definition Lists

<dl>
<dt>First Term</dt>
<dd>This is the definition of the first term.</dd>

<dt>Second Term</dt>
<dd>This is the definition of the second term.</dd>
</dl>

## Links

[Inline link](https://example.com)

[Inline link with title](https://example.com "Example Title")

<https://example.com/autolink>

## Images

![Alt text for image](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=320&fit=crop "Placeholder Image")

## Video

<video controls>
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Figures

<figure>
  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=320&fit=crop" alt="A beautiful landscape" width="100%" />
  <figcaption>This is a figure caption describing the image above.</figcaption>
</figure>

## Math

Inline math: $E = mc^2$

Display math:
$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

## Code

Inline code: `const x = 42;` and `another_variable`.

Fenced code block, no language:

```
plain fenced code block
line two of plain code
```

Fenced code block with language for syntax highlighting:

```js
function greet(name) {
  const message = `Hello, ${name}!`
  console.log(message)
  return message
}
```

Fenced code block with filename and highlighted line:

```ts [nuxt.config.ts] {2}
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'], // This line is highlighted
  modules: ['@nuxt/ui']
})
```

Diff-style code block:

```diff [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
-   '@nuxt/ui-pro'
+   '@nuxt/ui'
  ]
})
```

## Tables

::div{class="prose-scroll"}
| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:---------------:|--------------:|
| a            | b               | c             |
| longer cell  | x               | 1.00          |
| **bold**     | *italic*        | `code`        |
::

## Horizontal Rule

---

## Special Characters & Entities

Ampersand: A & B, entity: A &amp; B

  Less than / greater than: 5 < 10 and 10 > 5

  Copyright and trademark entities: &copy; &trade; &mdash; &hellip;

  Smart quotes test: "double quotes" and 'single quotes' and an em dash — and an en dash –.

## Emoji & Unicode

  Emoji shorthand test: :smile: :rocket: :tada:

  Direct unicode emoji: 😀 🚀 🎉

  Unicode text: café, naïve, Zürich, 北京, Москва, مرحبا

[^1]: This is the footnote's content.