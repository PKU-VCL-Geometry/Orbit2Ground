# [CVPR 2026 Findings] 🛰️ From Orbit to Ground: Generative City Photogrammetry from Extreme Off-Nadir Satellite Images

Official repository for **From Orbit to Ground: Generative City Photogrammetry from Extreme Off-Nadir Satellite Images**.

[[Project Page](https://pku-vcl-geometry.github.io/Orbit2Ground/)] [[arXiv](https://arxiv.org/abs/2512.07527)]

## Status

🙏 Thank you for your interest in our work.

**[Update on Jun 14, 2026]**

We sincerely appreciate the community's interest in Orbit2Ground and the requests for code release.

Although we originally planned to make the code publicly available, the release is currently on hold mainly due to additional constraints related to our broader project collaborations.

As a result, we are unfortunately unable to provide the code or an estimated release date at this stage. We apologize for the inconvenience and truly appreciate your understanding and patience.

We will update this repository if the situation changes in the future.

## Overview

**From Orbit to Ground** studies photorealistic city-scale 3D reconstruction from sparse, extreme off-nadir satellite images.

🏙️ Our key idea is to model the city as a **2.5D height map**, implemented as a **Z-monotonic SDF**, which helps recover clean geometry and watertight vertical facades from challenging satellite viewpoints.

🎨 On top of the reconstructed geometry, we further enhance appearance with a **generative texture restoration** strategy, producing sharper and more plausible near-ground renderings.

Together, these designs enable high-quality **orbit-to-ground view synthesis** for large-scale urban scenes.

## Citation

If you find our work useful, please consider citing:

```bibtex
@misc{yu2025orbit2ground,
    title={From Orbit to Ground: Generative City Photogrammetry from Extreme Off-Nadir Satellite Images},
    author={Fei Yu and Yu Liu and Luyang Tang and Mingchao Sun and Zengye Ge and Rui Bu and Yuchao Jin and Haisen Zhao and He Sun and Yangyan Li and Mu Xu and Wenzheng Chen and Baoquan Chen},
    year={2025},
    eprint={2512.07527},
    archivePrefix={arXiv},
    primaryClass={cs.CV},
    url={https://arxiv.org/abs/2512.07527},
}
