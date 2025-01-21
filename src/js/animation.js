$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger);

    // Анимация opacity
    gsap.utils.toArray('.head-animated').forEach(head => {
        gsap.from(head, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: head,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Анимация заголовков по скролу
    gsap.utils.toArray('.head-animated-scroll').forEach(head => {
        gsap.from(head, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
                trigger: head,
                start: "top 80%",
                end: "top 20%",
                scrub: 0.5,
            }
        });
    });

    // Анимация блоков
    gsap.utils.toArray('.block-animated-scale').forEach(block => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: "top 80%",
                end: "top 20%",
                scrub: 0.5
            },
            y: 100,
            scale: 0.8,
            opacity: 0,
        });
    });

    // Анимация блоков слева
    gsap.utils.toArray('.from-left').forEach(block => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: "top 80%",
                end: "top 20%",
                scrub: 0.5
            },
            x: -100, // начальная позиция слева
            opacity: 0
        });
    });

    // Анимация блоков справа
    gsap.utils.toArray('.from-right').forEach(block => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: "top 80%",
                end: "top 20%",
                scrub: 0.5
            },
            x: 100, // начальная позиция справа
            opacity: 0
        });
    });


    //Анимация текста
    let text = document.querySelector('.cloud__description .h1h2');
    if (text) {
        const chars = text.textContent.split('');
        text.textContent = '';

        const totalScrollDistance = 60;
        // const sectionHeight = totalScrollDistance / chars.length;
        const sectionHeight = 100 / chars.length;
        const textEndPoint = Math.min(sectionHeight * chars.length, 100);

        chars.forEach((char, index) => {
            let span = document.createElement('span');
            span.textContent = char;
            span.className = 'char';
            text.appendChild(span);

            gsap.to(span, {
                scrollTrigger: {
                    trigger: ".cloud__description",
                    start: `${sectionHeight * index}% center`,
                    end: `${sectionHeight * (index + 1)}% center`,
                    scrub: 0.5,
                    toggleActions: "play reverse play reverse"
                },
                color: "#000000",
                ease: "none"
            });
        });

        //Анимация cloud_message
        let firstMessages = document.querySelectorAll('.cloud__message-first');
        let lastFirstMessageEndPoint = 0;

        if (firstMessages.length > 0) {
            firstMessages.forEach((message, index) => {
                gsap.set(message, {
                    opacity: 0,
                    y: 10
                });



                // const startPoint = Math.min(15 + (index * 15), textEndPoint - 20);
                // const endPoint = Math.min(35 + (index * 15), textEndPoint - 10);

                const startPoint = 20 + (index * 13); // Каждое следующее сообщение начинается через 13%
                const endPoint = startPoint + 10;
                lastFirstMessageEndPoint = textEndPoint + 10;
                gsap.to(message, {
                    scrollTrigger: {
                        trigger: ".cloud__description",
                        start: `${startPoint}% center`,
                        end: `${endPoint}% center`,
                        scrub: 1,
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                });

                // Fade out animation
                gsap.to(message, {
                    scrollTrigger: {
                        trigger: ".cloud__description",
                        start: `${textEndPoint}% center`,
                        end: `${lastFirstMessageEndPoint}% center`,
                        scrub: 1,
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    y: -10,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }

        // Second set of messages
        let newMessages = document.querySelectorAll('.cloud__message-new');
        if (newMessages.length > 0) {
            newMessages.forEach((message, index) => {
                gsap.set(message, {
                    opacity: 0,
                    y: 10
                });

                // Start new messages after the last first message is faded out
                const startPoint = lastFirstMessageEndPoint + (index * 15);

                gsap.to(message, {
                    scrollTrigger: {
                        trigger: ".cloud__description",
                        start: `${startPoint}% center`,
                        end: `${startPoint + 15}% center`,
                        scrub: 1,
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }

        const titleText = document.querySelector('.cloud__title h2');

        if (titleText) {
            gsap.to(titleText, {
                scrollTrigger: {
                    trigger: ".cloud__description",
                    start: `${textEndPoint}% center`,
                    end: `${textEndPoint + 10}% center`,
                    scrub: 1,
                    toggleActions: "play none none reverse",
                    onEnter: () => {
                        // Анимация смены текста на "Цінуємо у кандидатах:"
                        gsap.to(titleText, {
                            opacity: 0,
                            duration: 0.3,
                            onComplete: () => {
                                titleText.textContent = "Цінуємо у кандидатах:";
                                gsap.to(titleText, {
                                    opacity: 1,
                                    duration: 0.3
                                });
                            }
                        });
                    },
                    onLeaveBack: () => {
                        // Анимация возврата текста на "Ми:"
                        gsap.to(titleText, {
                            opacity: 0,
                            duration: 0.3,
                            onComplete: () => {
                                titleText.textContent = "Ми:";
                                gsap.to(titleText, {
                                    opacity: 1,
                                    duration: 0.3
                                });
                            }
                        });
                    }
                }
            });
        }
    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    const numberElements = document.querySelectorAll('.facts__item .h1h2 span');

    if (numberElements) {
        numberElements.forEach(element => {
            const endValue = parseInt(element.textContent.replace(/\s/g, ''));
            element.textContent = '0';

            const duration = Math.min(2 + Math.log10(endValue) * 0.3, 4);

            gsap.to({
                value: 0
            }, {
                value: endValue,
                duration: duration,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                onUpdate: function (anim) {
                    const value = Math.round(this.targets()[0].value);
                    element.textContent = formatNumber(value);
                }
            });
        });
    }

    //Анимация отзывы на главной
    const images = gsap.utils.toArray('.main-card__images .image');

    if (images) {
        images.forEach(image => {
            gsap.set(image, {
                y: -500, // Начальная позиция выше видимой области
                opacity: 0,
                rotation: gsap.utils.random(-20, 20), // Случайный поворот
                scale: gsap.utils.random(0.9, 1.1)
            });
        });
        // временная шкала
        const tl = gsap.timeline({
            defaults: {
            ease: "power3.in", // Эффект пружинящего падения
            duration: 0.6
            }
        });

        images.forEach((image, index) => {
            tl.to(image, {
              y: 0, // Конечная позиция (исходная позиция элемента)
              opacity: 1,
              rotation: 0,
              delay: index * 0.06, // Небольшая задержка между фото
              ease: "power3.in",
              onComplete: () => {
                gsap.to(image, {
                  duration: 0.3,
                  rotation: 0,
                  scale: 1,
                  ease: "power2.out"
                });
              }
            }, index * 0.02); // Старт анимации для каждой следующей фото
          });
          
          const likes = gsap.utils.toArray('.image.like');
          likes.forEach((like, index) => {
            tl.to(like, {
              y: 0,
              opacity: 1,
              rotation: 0,
              ease: "elastic.out(1, 0.5)", // Более упругая анимация для лайков
              duration: 1
            }, `-=${likes.length * 0.1}`);
          });
    }

    // Получаем все изображения
// const images = gsap.utils.toArray('.main-card__images .image');

// // Начальные настройки для всех изображений
// images.forEach(image => {
//   const rect = image.getBoundingClientRect();
//   gsap.set(image, {
//     y: -window.innerHeight,
//     opacity: 0,
//     rotation: gsap.utils.random(-30, 30),
//     scale: gsap.utils.random(0.8, 1.2)
//   });
// });

// // Создаем временную шкалу
// const tl = gsap.timeline({
//   defaults: {
//     duration: 1.4,
//     ease: "power2.inOut"
//   }
// });

// // Анимация полета и приземления для всех изображений
// images.forEach((image, index) => {
//   const startX = gsap.utils.random(-100, 100);
  
//   tl.fromTo(image, 
//     {
//       x: startX
//     },
//     {
//       y: 0,
//       x: 0, 
//       opacity: 1,
//       rotation: 0,
//       scale: 1,
//       duration: gsap.utils.random(1.2, 1.6),
//       ease: "power2.in",
//       //покачивание во время полета
//       onUpdate: function() {
//         const progress = this.progress();
//         if (progress < 0.8) { // Прекращаем покачивание ближе к концу
//           const wave = Math.sin(progress * Math.PI * 3) * 50 * (1 - progress);
//           gsap.set(image, { x: wave });
//         }
//       }
//     }, 
//     0
//   );
// });

// // Анимация для лайков
// const likes = gsap.utils.toArray('.image.like');
// likes.forEach(like => {
//   gsap.set(like, {
//     y: -window.innerHeight,
//     opacity: 0,
//     rotation: gsap.utils.random(-45, 45)
//   });
  
//   tl.to(like, {
//     y: 0,
//     opacity: 1,
//     rotation: 0,
//     duration: 1,
//     ease: "back.out(1.7)",
//   }, 0.5);
// });
})