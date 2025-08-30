'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [typingText, setTypingText] = useState('');
  const fullText = '김포의 특별한 휴식공간';
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 타이핑 효과
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // 스크롤 애니메이션 옵저버
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-amber-700 animate-fadeInLeft">사랑채</h1>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('intro')} className="text-gray-700 hover:text-amber-600 transition-colors">소개</button>
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-amber-600 transition-colors">시설</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-700 hover:text-amber-600 transition-colors">요금</button>
              <button onClick={() => scrollToSection('location')} className="text-gray-700 hover:text-amber-600 transition-colors">위치</button>
            </div>
            <a
              href="https://booking.naver.com/booking/3/bizes/892892"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors font-medium button-press animate-fadeInRight"
            >
              예약하기
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 to-stone-900/50 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1920')] bg-cover bg-center animate-scaleIn"></div>
        
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="inline-block animate-fadeInUp">{typingText}</span>
            <span className="inline-block animate-fadeInUp delay-500 block text-3xl md:text-5xl mt-4 text-amber-300 animate-float">사랑채</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fadeInUp delay-300">
            도심을 벗어나 즐기는 프라이빗 독채 파티룸
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://booking.naver.com/booking/3/bizes/892892"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transform hover:scale-105 transition-all shadow-xl button-bounce gradient-animation animate-fadeInLeft delay-400"
            >
              지금 예약하기
            </a>
            <button
              onClick={() => scrollToSection('intro')}
              className="bg-white/20 backdrop-blur text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-amber-700 transform hover:scale-105 transition-all animate-fadeInRight delay-400"
            >
              더 알아보기
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-lg">
            <div className="flex items-center gap-2 animate-fadeInUp delay-500">
              <span className="text-amber-300 animate-float">⭐</span>
              <span>에어비앤비 평점 4.85</span>
            </div>
            <div className="flex items-center gap-2 animate-fadeInUp delay-600">
              <span className="text-amber-300 animate-float delay-100">🏠</span>
              <span>독채 프라이빗</span>
            </div>
            <div className="flex items-center gap-2 animate-fadeInUp delay-700">
              <span className="text-amber-300 animate-float delay-200">🎤</span>
              <span>최신 노래방</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="intro" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 scroll-animate">
              왜 사랑채인가?
            </h3>
            <div className="w-24 h-1 bg-amber-600 mx-auto scroll-animate delay-100"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow scroll-animate-left hover-lift">
                <h4 className="text-2xl font-bold text-amber-700 mb-3">🏡 완벽한 독채 공간</h4>
                <p className="text-gray-600 leading-relaxed">
                  다른 손님과 공간을 공유하지 않는 완전한 프라이빗 공간입니다. 
                  소음 걱정 없이 마음껏 즐기실 수 있습니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow scroll-animate-left delay-200 hover-lift">
                <h4 className="text-2xl font-bold text-amber-700 mb-3">🎉 다양한 즐길거리</h4>
                <p className="text-gray-600 leading-relaxed">
                  최신 노래방 시스템, 바베큐 시설, 불멍 공간까지 
                  모든 것이 준비되어 있습니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow scroll-animate-left delay-300 hover-lift">
                <h4 className="text-2xl font-bold text-amber-700 mb-3">🌟 검증된 만족도</h4>
                <p className="text-gray-600 leading-relaxed">
                  에어비앤비 평점 4.85점! 실제 고객님들의 높은 만족도가 
                  사랑채의 품질을 증명합니다.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-orange-50 p-8 rounded-3xl scroll-animate-right animate-shimmer">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  김포에서 조용하고 아늑한 모임장소를 찾고 계신다면 사랑채가 좋은 선택이 될 수 있습니다.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  도시의 소음을 벗어나 한적한 분위기에서 주변 방해 없이 마음껏 즐길 수 있는 환경을 제공합니다.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  가족 모임, 친구들과의 파티, 연인과의 특별한 시간 등 모든 순간을 더욱 특별하게 만들어드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 scroll-animate">
              사랑채의 특별한 시설
            </h3>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-4 scroll-animate delay-100"></div>
            <p className="text-xl text-gray-600 scroll-animate delay-200">완벽한 휴식과 즐거움을 위한 모든 것</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all scroll-animate-scale delay-100 hover-lift">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">최신 노래방 시스템</h4>
                <p className="text-gray-600 mb-4">최신곡이 수록된 고음질 노래방 시설로 파티 분위기를 한껏 살려보세요.</p>
                <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">무료 이용</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all scroll-animate-scale delay-200 hover-lift">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">바베큐 파티</h4>
                <p className="text-gray-600 mb-4">넓은 야외 공간에서 즐기는 바베큐 파티. 캠핑 감성 그대로!</p>
                <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">40,000원</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all scroll-animate-scale delay-300 hover-lift">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">감성 불멍</h4>
                <p className="text-gray-600 mb-4">따뜻한 불빛을 바라보며 힐링하는 특별한 시간을 가져보세요.</p>
                <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">20,000원</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all scroll-animate-scale delay-400 hover-lift">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">캠핑 감성</h4>
                <p className="text-gray-600 mb-4">도심 속에서 즐기는 캠핑! 자연과 함께하는 힐링 공간입니다.</p>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">포함</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all scroll-animate-scale delay-500 hover-lift">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">넓은 독채 공간</h4>
                <p className="text-gray-600 mb-4">답답하지 않은 넓고 쾌적한 공간에서 자유롭게 즐기세요.</p>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">프라이빗</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all scroll-animate-scale delay-600 hover-lift">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">파티 공간</h4>
                <p className="text-gray-600 mb-4">생일파티, 기념일, 동창회 등 모든 모임이 가능한 완벽한 공간.</p>
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">모임 최적화</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 scroll-animate">
              이용 요금 안내
            </h3>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-4 scroll-animate delay-100"></div>
            <p className="text-xl text-gray-600 scroll-animate delay-200">합리적인 가격으로 특별한 추억을 만들어보세요</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-3xl text-white shadow-2xl hover:transform hover:scale-105 transition-all scroll-animate-left hover-lift gradient-animation">
              <h4 className="text-3xl font-bold mb-4">주말 올데이</h4>
              <p className="text-5xl font-bold mb-4">300,000<span className="text-2xl">원</span></p>
              <p className="text-xl mb-6 opacity-90">15시 ~ 다음날 11시</p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  20시간 이용
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  모든 시설 이용 가능
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  노래방 무료
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8 rounded-3xl shadow-xl hover:transform hover:scale-105 transition-all scroll-animate-right hover-lift">
              <h4 className="text-3xl font-bold text-gray-800 mb-4">주중 데이</h4>
              <p className="text-5xl font-bold text-gray-800 mb-4">25,000<span className="text-2xl">원</span></p>
              <p className="text-xl text-gray-600 mb-6">시간당</p>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  시간 단위 이용
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  유연한 이용 시간
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  최소 3시간 이용
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl scroll-animate">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">추가 옵션</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl hover-lift">
                <span className="text-lg font-medium text-gray-700">🍖 바베큐 세트</span>
                <span className="text-xl font-bold text-amber-600">40,000원</span>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-xl hover-lift">
                <span className="text-lg font-medium text-gray-700">🔥 불멍 세트</span>
                <span className="text-xl font-bold text-amber-600">20,000원</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 scroll-animate">
              오시는 길
            </h3>
            <div className="w-24 h-1 bg-amber-600 mx-auto scroll-animate delay-100"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 scroll-animate-left">
              <h4 className="text-2xl font-bold text-gray-800 mb-6">사랑채 위치 정보</h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-amber-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">주소</p>
                    <p className="text-gray-600">경기 김포시 양촌읍 양곡로130번길 306-31 1층</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-amber-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">전화번호</p>
                    <a href="tel:0507-1364-7231" className="text-amber-600 hover:text-amber-700">0507-1364-7231</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-amber-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">운영시간</p>
                    <p className="text-gray-600">24시간 영업</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-amber-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">찾아오시는 방법</p>
                    <p className="text-gray-600">김포시 양촌읍 누산사거리에서 2-3km</p>
                    <p className="text-gray-600">티맵보다 카카오네비를 추천합니다</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://booking.naver.com/booking/3/bizes/892892"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg button-press"
                >
                  네이버에서 예약하기
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-96 md:h-auto scroll-animate-right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.7877!2d126.6340!3d37.6074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDM2JzI2LjciTiAxMjbCsDM4JzAyLjQiRQ!5e0!3m2!1sko!2skr!4v1635959053178!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600 gradient-animation">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 scroll-animate">
            특별한 추억을 만들 준비되셨나요?
          </h3>
          <p className="text-xl text-white/90 mb-8 scroll-animate delay-100">
            김포 사랑채에서 소중한 사람들과 잊지 못할 시간을 보내세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://booking.naver.com/booking/3/bizes/892892"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-amber-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl button-bounce scroll-animate-left delay-200"
            >
              네이버 예약하기
            </a>
            <a
              href="tel:0507-1364-7231"
              className="bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-amber-800 transform hover:scale-105 transition-all shadow-xl border-2 border-white/30 button-bounce scroll-animate-right delay-200"
            >
              📞 전화 문의하기
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4 text-amber-400">사랑채</h4>
              <p className="text-gray-400">
                김포의 특별한 휴식공간<br />
                도심을 벗어나 즐기는 프라이빗 파티룸
              </p>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">연락처</h5>
              <p className="text-gray-400">
                전화: 0507-1364-7231<br />
                운영시간: 24시간 영업
              </p>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">위치</h5>
              <p className="text-gray-400">
                경기 김포시 양촌읍 양곡로130번길<br />
                306-31 1층
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 사랑채. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}