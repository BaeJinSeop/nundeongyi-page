#!/usr/bin/env python3
"""실기 시뮬레이터 캡처(/tmp/landing_shots/*.png)를 랜딩 webp로 변환.

iPhone 15 Pro simctl 캡처(1179x2556, 상태바 포함)를 그대로 쓴다 —
PhoneShot의 nativeStatusBar 규격. sync_v2_assets.py의 골든 기반 SCREENS를
대체하는 실기 캡처 경로.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

SHOTS = Path("/tmp/landing_shots")
OUTPUT = Path(__file__).resolve().parent / "assets" / "images" / "v2"

# 캡처 이름 → 랜딩 파일명
MAPPING = {
    "dashboard.png": "dashboard-iphone15pro.webp",
    "consideration.png": "consideration.webp",
    "expense-insight.png": "expense-insight.webp",
    "expense-add.png": "expense-add.webp",
    "simulator.png": "simulator.webp",
}


def main() -> None:
    for source_name, dest_name in MAPPING.items():
        source = SHOTS / source_name
        if not source.exists():
            print(f"SKIP {source_name} — 캡처 없음")
            continue
        image = Image.open(source)
        assert image.size == (1179, 2556), f"{source_name}: {image.size} (기대 1179x2556)"
        dest = OUTPUT / dest_name
        image.save(dest, "WEBP", quality=82, method=6)
        print(f"{dest.name} {image.width}x{image.height} {dest.stat().st_size:,}B")


if __name__ == "__main__":
    main()
