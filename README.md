# RyoonLog

<img width="100%" src="./public/RyoonLog.gif"/>

- [tangly1024](https://github.com/tangly1024)님의 [NotionNext](https://github.com/tangly1024/NotionNext)블로그를 기반으로 커스터마이징하고 수정하여 작성한 Next.js-notion static 개인 블로그입니다.

- (A static blog built with NextJS and Notion API, supporting multiple deployment options. No server required, zero threshold to set up a website. Designed for Notion and all creators.)

## 추가 적용한 작업 및 기능( 2023.11 기준)

### 메뉴추가

- Portfolio(개인 포트폴리오 올리는 메뉴)메뉴 생성 및 그에 해당하는 레이아웃, 페이지, 컴포넌트, api 작업에 대하여 진행하였습니다.

- The Log(개인의 일상적인 기록-일기같은)메뉴 및 그에 해당하는 레이아웃, 페이지, 컴포넌트, api 작업에 대하여 진행하였습니다.

- The Log의 로직, 레이아웃, 페이지컴포넌트등을 활용하여 Read & Writes(읽고 사유하고 쓰는 공간)메뉴와 Inspiration(인스타그램의 영감기록 계정과 같은 공간)메뉴또한 신설 하였습니다.

- 게스트북은 하나의 페이지로 구성하여 Ryoon 메뉴 하위에 구성하였습니다.

### 기술로그

- GitBook theme의 왼쪽 네비게이션 목록에 노출되는 post들은 오직 기술 블로그 글에만 해당하도록 수정하였습니다.

### ALL

- 기존의 type이 Post인 블로그 글만 적용 가능했던 Cateory, Archive, Search 기능을 type이 Read,Portfolio,Inspiration,TheLog,GuestBook인 글들도 가능하도록 slug및 routing 그리고 data를 끌어오는 영역에대한 전체 수정을 완료하였습니다.

### 댓글

- 댓글은 Giscus(General 카테고리한정)을 적용하였습니다.

### Theme

- Theme은 저의 취향에 맞게 gitbook, hexo, medium 이 세가지 theme만 적용하였습니다.
- 각각의 theme은 제 취향에 맞게(노란색 초록생으 좋아하는 편,,,) 탑바, 스크롤바, 푸터 등등 구석구석 수정 하였습니다.
  </br>
  </br>
  </br>


## Technologies Used

- **Technical Framework**: [Next.js](https://nextjs.org)
- **Styles**: [Tailwind CSS](https://www.tailwindcss.cn/)
- **Rendering Tool**: [React-notion-x](https://github.com/NotionX/react-notion-x)
- **COMMENT**: [Twikoo](https://github.com/imaegoo/twikoo), [Giscus](https://giscus.app/zh-CN), [Gitalk](https://gitalk.github.io), [Cusdis](https://cusdis.com), [Utterances](https://utteranc.es)
- **ICON**: [Fontawesome](https://fontawesome.com/v6/icons/)

## License

The [MIT License](https://github.com/tangly1024).
