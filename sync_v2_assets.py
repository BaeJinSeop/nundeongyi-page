#!/usr/bin/env python3
"""Sync approved V2 app visuals into the standalone landing-page repository.

The app and landing page are separate repositories. Run this script after the
V2 golden images change so GitHub Pages never depends on sibling paths.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

PAGE_ROOT = Path(__file__).resolve().parent
APP_ROOT = PAGE_ROOT.parent / "nundeongyi-app"
GOLDENS = APP_ROOT / "test" / "widget" / "goldens"
DASHBOARD_ASSETS = APP_ROOT / "assets" / "images" / "dashboard_v2"
STORE_GRAPHICS = APP_ROOT / "store_graphics" / "v1.3.0" / "google-play"
OUTPUT = PAGE_ROOT / "assets" / "images" / "v2"

SCREENS = {
    "dashboard.webp": "dashboard_v2_light_390x844.png",
    "consideration.webp": "micro_action_screen_light_390x844.png",
    "choice-result.webp": "consideration_resist_result_v2_light_390x844.png",
    "expense-add.webp": "expense_add_v2_light_390x844.png",
    "expense-insight.webp": "expense_insight_light_390x844.png",
    "snowflake-gallery.webp": "snowflake_gallery_v2_light_390x844.png",
    "simulator.webp": "simulator_create_v2_light_390x844.png",
}

DECORATIONS = {
    "hand-wave.webp": "ui-hand-wave.png",
    "future-plant.webp": "ui-future-plant.png",
    "snowflake.webp": "ui-snowflake.png",
    "streak-fire.webp": "ui-streak-fire.png",
    "decision-check.webp": "ui-decision-check.png",
    "shopping-bag.webp": "ui-shopping-bag.png",
    "goal-mountain.webp": "ui-goal-mountain.png",
}


def save_webp(source: Path, destination: Path, *, quality: int = 88) -> None:
    image = Image.open(source)
    image.save(destination, "WEBP", quality=quality, method=6)
    print(f"{destination.relative_to(PAGE_ROOT)} {image.width}x{image.height} {destination.stat().st_size:,} bytes")


def build_og_image() -> None:
    source = Image.open(STORE_GRAPHICS / "feature_graphic_1024x500.png").convert("RGB")
    canvas = Image.new("RGB", (1200, 630), "#EAF2FD")
    source.thumbnail((1200, 586), Image.Resampling.LANCZOS)
    x = (canvas.width - source.width) // 2
    y = (canvas.height - source.height) // 2
    canvas.paste(source, (x, y))
    destination = OUTPUT / "og-v2.png"
    canvas.save(destination, "PNG", optimize=True)
    print(f"{destination.relative_to(PAGE_ROOT)} 1200x630 {destination.stat().st_size:,} bytes")


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for destination, source in SCREENS.items():
        save_webp(GOLDENS / source, OUTPUT / destination)
    for destination, source in DECORATIONS.items():
        save_webp(DASHBOARD_ASSETS / source, OUTPUT / destination, quality=90)
    save_webp(
        STORE_GRAPHICS / "app_icon_512.png",
        OUTPUT / "app-icon.webp",
        quality=92,
    )
    build_og_image()


if __name__ == "__main__":
    main()
