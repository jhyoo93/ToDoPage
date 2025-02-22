# To-Do List

📌 **Next.js기반의 To-Do 리스트 애플리케이션**     

✅ **할 일(Tasks) 추가, 수정, 삭제 가능**  
✅ **드래그 앤 드롭을 활용한 보드(Board) 및 할 일(Task) 정렬 기능 지원**  
✅ **로컬 스토리지를 활용하여 데이터 영구 저장**  
✅ **빠른 성능과 최적화된 상태 관리를 위한 Zustand 사용**

---

## **기술 스택**

| 기술 | 설명 |
|------|------|
| **Next.js 14** | 최신 React 프레임워크 |
| **TypeScript** | 정적 타입을 지원하여 안정적인 코드 작성 |
| **Zustand** | 전역 상태 관리 라이브러리 |
| **@hello-pangea/dnd** | 드래그 앤 드롭 기능 구현 |
| **Tailwind CSS** | 빠른 스타일링 및 반응형 UI |
| **LocalStorage** | 로컬 데이터 저장 (페이지 새로고침 시 데이터 유지) |

---

## **프로젝트 폴더 구조**

```bash
📦 src
 ┣ 📂 components
 ┃ ┣ 📜 Board.tsx       # 보드 컴포넌트
 ┃ ┣ 📜 BoardList.tsx   # 보드 목록
 ┃ ┣ 📜 Task.tsx        # 할 일 컴포넌트
 ┃ ┣ 📜 TaskList.tsx    # 할 일 목록
 ┃ ┗ 📜 Button.tsx      # 재사용 버튼 컴포넌트
 ┣ 📂 store
 ┃ ┗ 📜 todoStore.ts    # Zustand 전역 상태 관리
 ┣ 📂 styles
 ┃ ┗ 📜 globals.css     # 글로벌 스타일
 ┣ 📜 page.tsx          # 메인 페이지
 ┗ 📜 types.ts          # TypeScript정의
```

--- 

## 주요 기능

1️⃣ 보드 관리  
- 보드 추가  
- 보드 제목 수정  
- 보드 삭제  
- 보스 순서 변경(드래그 앤 드롭)  

2️⃣ 할 일(Task) 관리  
- 할 일 추가  
- 내용 수정  
- 삭제  
- 보드내 할 일 순서 변경(드래그 앤 드롭)  

3️⃣ 데이터 저장
- Zustand의 persist 기능을 활용하여 LocalStorage에 자동 저장
- 페이지 새로고침 후에도 데이터 유지
