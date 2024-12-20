# 1. RWWT-log

A static blog built with NextJS and Notion API, supporting multiple deployment options. No server required, zero threshold to set up a website. Designed for Notion and all creators
![R](../RWWT-log//public/RyoonLog.gif)

- [tangly1024](https://github.com/tangly1024)님의 [NotionNext](https://docs.tangly1024.com/about) 블로그에 영감을 받아, 재해석 하여 제작한 Next.js 13와 Notion API기반의 Gitbook레이아웃을 적용한 정적 블로그입니다.
- 블로그가 블로그로서의 본연의 기능을 가장 최적으로 수행할 수 있도록 불필요한 기능과 모듈은 전부 제거하고, 가장 심플하고 essential한 뼈대와 구조만으로 이루어지게 변경하였습니다.
- 모바일과 PC환경에 친화적이며 간단한 다크모드도 지원합니다.
- 작년 9월부터 24년도 6월까지 장기간에 걸쳐 틈틈이 개발 및 유지보수 작업을 진행하였습니다.
- 처음에는 기존과 같이 Multi theme(전체 레이아웃이 바뀌는 기능)을 적용하였으나, 누군가에게 과시적으로 보여주기 위한 용도이기보다는 온전히 저에게 진실되며 또 방문자에게도 진실된 공간으로 만들고자 하는 욕구가 더 컸으므로 과감하게 해당 개발건은 드롭하고 오직 gitbook theme으로 작업을 이어나갔습니다.

- Next.js 13 ver Gitbook themed Notion-Static-Blog.
- special credit to [tangly1024](https://github.com/tangly1024)'s [NotionNext](https://github.com/tangly1024/NotionNext) for inspiration

# 2. 구성 : 블로그 KV, Color, 배치

## 1.색상

- 주 Key Visual이 되는 색상은 [Yellow(amber-400)](https://flowbite.com/docs/customize/colors/) 으로 설정하였습니다.
- 메인컬로를 기준으로, Orange, Red의 색깔들로만 디자인적 강조를 두게 하였습니다.
- 전체 텍스트 색상, 다크모드시의 배경 및 메뉴색상등은 전부 neutral-400을 바탕으로 + -를 두어 적용하였습니다.

## 2.블로그 메뉴

- Top Nav는 가장 주요한 5개의 메뉴로만 구성해두었습니다.

  ### 1-1. 🍋Logs

  - 첫 진입시 마주하는 🍋Logs에는 이 개인블로그에서 작성하는 전체글을 전부 확인할 수 있습니다.
  - 🍋 : 우리 모두는 삶에서 경험하는 레몬들을 적립하여 자신만의 레시피로 레몬에이드를 만드는 중인 레몬에이드 메이커라 생각합니다. 그 모든 레몬들에 대한 기록이라는 은유적 표현으로 레몬을 메뉴 아이콘으로 적용하였습니다.
  - Key Visual 색상인 Yellow(amber-400)으로만 간결하게 집중과 강조를 표현하였습니다.
  - 제가 설정한 글의 TYPE은 라이프로그/개발로그/글쓰기모음(독후감,문장수집,에세이 등)/재능기부 & 창작기록/ 영감기록으로 총 5개로 이루어져 있습니다.
  - 5개 분야의 글로 이루어져 있다는 것을 어떻게 표현해야 불필요하지 않고 소모적이지 않으며 지금의 Gitbook theme과 자연스럽게 녹아져내리도록 직관적으로 소구할 수 있을지에 대한 부분을 고려하며 레이아웃 및 디자인 작업을 진행하였습니다.

  ### 1-2. 🍋 Logs By

  - Logs by는 글의 Category타입별로 전체 블로그글을 볼 수 있는 메뉴입니다.
  - 전체 5개 메뉴에 대한 디자인/레이아웃 작업을 진행 하였습니다.
  - **TIL Tech Logs:**
    - 개인블로그이긴 하지만 직업으로서의 개발자의 삶을 이루어 나아가고 있음으로 TIL Tech Logs를 Logs By 메뉴의 가장 선두에 두었습니다.
    - TIL Tech Logs의 메인 컬러는 Orange입니다. 불타오르는 오렌지 색상같이 기술은 자칫 딱딱하고 이성적으로만 비춰지곤 하지만 조용하게 끓어오르는 열정으로 주변을 밝히는 전등과도 불씨와도 같다고 생각하기 때문입니다.
    - 완료주의 > 완성주의. 이 진리는 모든 배움에 적용 된다고 생각합니다. 해당 문장을 자주 보면서 개발일지를 적을 수 있도록 상단에 배치하였습니다.
    - 또한 개발글들은 시각적으로 자칫 재미없고 밋밋하게 느껴질 수도 있기 때문에 Photo-card 형식의 목록으로 전체글을 표현할 수 있도록 작업하였습니다.
    - 각 글에 대하여 색상이 적용된 태그값으로 해당 글이 어떤 기술에 대한 글인지 확인할 수 있습니다.
  - **Life logs**:
    - 저의 개인적이고 아주 사적인 일기와 같은 삶의 조각들에 대한 글을 볼 수 있는 페이지입니다.
    - 자신과 자기 삶에 정직하고 진실된 - 그게 설령 초라하고 쪽팔리고 어설픈 부분도 있을지라도 - 사람이 결국은 장/단기적으로 자기 앞의 생을 이루어 나가게 된다는 것을 지난 1년여간 몸소 체험하였습니다. 이를 주제로 메뉴 작업을 진행하였습니다.
    - Life log의 메인 컬러는 Red입니다. 빨강은 가장 진실 되며 거짓 없는 삶의 심장과 같은 색이라고 생각합니다. 우리 신체에 흐르고 있는 피와 같이 삶을 관통하는 색이라고 생각하기 때문입니다. 라이프-로그라는 그 이름에 정직한 글들로만 앞으로도 적어내려 가고 싶은 욕심에 빨강색과 Omer시인의 문장 그리고 Red 와 Brown을 오가는 저의 사진들을 배경으로 적용하였습니다.
    - 정직하고 순수하게 글로서만 그 기능을 하는 메뉴들은 전부 리스트 형식으로 전체글을 표현하였습니다.
  - **Writing**:
    - 큰 호흡과 주제가 있는 글/ 독후감 / 좋은 문장에 대한 필사와 저의 견해 등에 대하여 읽어 볼 수 있는 페이지입니다.
    - Writing의 메인 컬러는 Yellow입니다. 저의 글 뿐 아니라 세상의 글, 타인의 글, 인터넷의 글 등 다양한 글에 대한 사유와 기록으로 점철된 페이지이기 때문입니다. 이 블로그의 메인 컬러이기도 한 Yellow가 전체 블로그를 아우르는 Base색인 것과 같이, 전체를 탐험하고 오고가는 문장들에 대하여 볼 수 있는 페이지 이기 때문에 블로그 메인 컬러와 동일한 색상으로 적용하였습니다.
    - 정직하고 순수하게 글로서만 그 기능을 하는 메뉴들은 전부 리스트 형식으로 전체글을 표현하였습니다.
  - **Giving Records**:
    - 저에게 존재하는 작은 재능들로 나누고, 봉사하고, 만들어낸 개발 외적인 사이드프로젝트들에 대하여 기록하는 페이지입니다.
    - Giving Records의 메인 컬러는 따로 없지만 메인 Visual은 있습니다.어떤 색으로 한계나 규정을 짓지않는 팔레트 입니다. LogsBy중 유일하게 Key Visual Icon이 있는 페이지입니다.
    - 봉사와 나눔이 왜 인간의 삶을 이롭게 하는지는 [우리는 다시 연결되어야 한다](https://www.aladin.co.kr/m/mproduct.aspx?ItemId=247420735)를 비롯하여 수 많은 자기계발서에서 언제나 강조하는 부분입니다. 그러나 20대 때는 가슴으로 깨닫지 못했습니다. 지난 9개월간 봉사를 하며 이 말의 진리를 알게 됐습니다. 수 많은 것들에 작게 다재 다능한 사람들이 의례 그러하듯 저 역시 여러 분야에 걸친 광범위한 호기심을 토대로 삶에서 다양한 것들에 도전하고 만들고 창작하여 보았습니다. 그래서 창작이라는 기준값에 대한 교집합이 있는 소프트웨어 엔지니어링을 좋아하는 것도 있습니다. 그러나 시간이 흐름에 따라 20대 때 즐겁게 연마해두었던 작은 재능들을 사용하기 어려워지는 경우가 훨씬 많은 삶을 살고 있었는데 봉사를 함으로써 저의 개인적 욕구도 해소하고 이타적 성취도 쟁취할 수 있게 됐습니다. 이에 대한 기록들이 있는 페이지입니다. 적다보니 든 생각인데 개발자들은 다들 일부분 타고난 Giver로서의 기질이 본능적으로 있는 사람들인 것 같네요. 그래서 이렇게 오픈소스 생태계가 활발하고 세상에 기여하는 생태계가 오래오래 유지되는 것 같습니다.
  - **Inspiration Log:**
    - [이숭희 마케터](https://campaign.naver.com/blogpeople/?5)님 및 [장인성 작가](https://www.yes24.com/Product/Goods/59438439)님에게 자극을 받아 기록하는 삶이 시작 됐습니다.
    - 자주 건강하게 질투하고, 부러워하고, 남으로 부터 잘 배워서 저의 인생을 다채롭게 일구어나가곤 합니다. 이에 대한 기록을 볼 수 있는 페이지입니다.
    - Inspiration Log의 메인 컬러는 Yellow이며 이유는 Writing로그와 같습니다.

# 3. 구성 : 사용된 기술 / 지원하는 기능

## 3-1. 사용된 기술

- **Technical Framework**: [Next.js](https://nextjs.org/) 13
- **Deploy**: [Vercel](https://vercel.com/)
- **Styles**: [Tailwind CSS](https://www.tailwindcss.cn/)
- **Rendering Tool**: [React-notion-x](https://github.com/NotionX/react-notion-x)
- **COMMENT**: [Giscus](https://giscus.app/zh-CN)
- **ICON**: [Fontawesome](https://fontawesome.com/v6/icons/)

## 3-1. 지원하는 기능

- **GooGleAdsense**: client key만 env에 적용시 바로 사용가능

### Site statistics

- **Google Site Verification(seo)**: client key만 env에 적용시 바로 사용가능
- **busuanzi**: 접속 url 별 website reading volume과 방문자 수 바로 확인 가능 (http://busuanzi.ibruce.info/)

# + 추가 작업 진행중

- 이 블로그 Format을 누구나 사용할 수 있게 Skeleton 리포지토리 작업 및 상세 명세서 작업을 진행하고 있습니다(24.06월 기준)

## License

The [MIT License](https://github.com/ryoonwithinwisdomlights/RWWT-log).
