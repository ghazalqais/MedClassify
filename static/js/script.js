/**
 * Enhanced Medical Classification System JavaScript
 * Compatible with enhanced HTML/CSS structure
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set viewport height for mobile browsers
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Initialize the application
    initializeApp();
});

/**
 * Set proper viewport height for mobile browsers
 */
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/**
 * Main initialization function
 */
function initializeApp() {
    // Determine which page we're on
    const isResultsPage = document.querySelector('.results-page') !== null;
    
    if (isResultsPage) {
        initializeResultsPage();
    } else {
        initializeHomePage();
    }
    
    // Common functionality for both pages
    initializeCommonFeatures();
}

/**
 * Initialize home page functionality
 */
function initializeHomePage() {
    setupFormHandling();
    setupExampleCards();
    setupTextareaFeatures();
    setupScrollAnimations();
    setupHeroAnimations();
}

/**
 * Initialize results page functionality
 */
function initializeResultsPage() {
    animateConfidenceBar();
    animateProbabilityBars();
    setupSpecialtyIcon();
    setupResultsAnimations();
    setupResultsInteractions();
}

/**
 * Initialize common features for both pages
 */
function initializeCommonFeatures() {
    setupSmoothScrolling();
    setupLoadingOverlay();
    setupResponsiveFeatures();
    setupTouchOptimizations();
}

/**
 * Setup hero animations
 */
function setupHeroAnimations() {
    // Trigger hero animations after page load
    const titleLines = document.querySelectorAll('.title-line');
    const heroDescription = document.querySelector('.hero-description');
    const heroStats = document.querySelector('.hero-stats');
    const heroActions = document.querySelector('.hero-actions');
    const heroVisual = document.querySelector('.hero-visual');
    
    // Reset animations on page load
    setTimeout(() => {
        if (titleLines.length > 0) {
            titleLines.forEach((line, index) => {
                line.style.animationDelay = `${0.2 + (index * 0.2)}s`;
            });
        }
        
        if (heroDescription) {
            heroDescription.style.animationDelay = '0.6s';
        }
        
        if (heroStats) {
            heroStats.style.animationDelay = '0.8s';
        }
        
        if (heroActions) {
            heroActions.style.animationDelay = '1s';
        }
        
        if (heroVisual) {
            heroVisual.style.animationDelay = '0.4s';
        }
    }, 100);
}

/**
 * Enhanced form handling with better validation
 */
function setupFormHandling() {
    const form = document.getElementById('medical-form');
    const textarea = document.getElementById('medical-query');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (!form || !textarea || !loadingOverlay) return;
    
    // Enhanced form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate input with enhanced checks
        const text = textarea.value.trim();
        
        if (text.length < 10) {
            showValidationError('يرجى كتابة وصف أكثر تفصيلاً (على الأقل 10 أحرف)');
            focusTextarea();
            return;
        }
        
        if (text.length > 1000) {
            showValidationError('النص طويل جداً، يرجى الاختصار (أقل من 1000 حرف)');
            focusTextarea();
            return;
        }
        
        // Check for meaningful content
        if (!/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text) && text.length < 10) {
            showValidationError('يرجى كتابة وصف باللغة العربية أو إنجليزية مفصلة');
            focusTextarea();
            return;
        }
        
        // Show enhanced loading
        showLoadingOverlay();
        
        // Add slight delay for better UX
        setTimeout(() => {
            form.submit();
        }, 800);
    });
    
    // Enhanced textarea interactions
    textarea.addEventListener('input', function() {
        autoResizeTextarea(this);
        updateCharacterCount(this);
        validateRealTime(this);
    });
    
    textarea.addEventListener('paste', function() {
        setTimeout(() => {
            autoResizeTextarea(this);
            updateCharacterCount(this);
        }, 10);
    });
}

/**
 * Enhanced example cards with better interactions
 */
function setupExampleCards() {
    // Handle both grid and scroll versions
    const allExampleCards = document.querySelectorAll('.example-card');
    const textarea = document.getElementById('medical-query');
    
    if (!textarea) return;
    
    allExampleCards.forEach(card => {
        card.addEventListener('click', function() {
            const exampleText = this.getAttribute('data-text');
            const specialty = this.getAttribute('data-specialty');
            
            if (exampleText) {
                // Enhanced click feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Fill textarea with smooth animation
                animateTextFill(textarea, exampleText);
                
                // Auto-resize and update counter
                setTimeout(() => {
                    autoResizeTextarea(textarea);
                    updateCharacterCount(textarea);
                }, 100);
                
                // Enhanced scroll to form
                const formContainer = document.querySelector('.form-container');
                if (formContainer) {
                    setTimeout(() => {
                        formContainer.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 200);
                }
                
                // Focus textarea after animation
                setTimeout(() => {
                    textarea.focus();
                    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
                }, 1000);
                
                // Enhanced notification
                showNotification(`تم اختيار مثال: ${specialty}`, 'success');
            }
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-blue-200)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
        });
        
        // Touch feedback for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

/**
 * Animate text filling in textarea
 */
function animateTextFill(textarea, text) {
    textarea.value = '';
    let index = 0;
    
    function typeNextChar() {
        if (index < text.length) {
            textarea.value += text.charAt(index);
            index++;
            setTimeout(typeNextChar, 20);
        }
    }
    
    typeNextChar();
}

/**
 * Enhanced textarea features
 */
function setupTextareaFeatures() {
    const textarea = document.getElementById('medical-query');
    
    if (!textarea) return;
    
    // Enhanced focus/blur effects
    textarea.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
        this.style.transform = 'translateY(-2px)';
    });
    
    textarea.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        this.style.transform = '';
    });
    
    // Add enhanced character counter
    addEnhancedCharacterCounter(textarea);
    
    // Initial setup
    autoResizeTextarea(textarea);
    updateCharacterCount(textarea);
}

/**
 * Enhanced auto-resize with better performance
 */
function autoResizeTextarea(textarea) {
    // Reset height to get correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate new height with limits
    const newHeight = Math.min(
        Math.max(textarea.scrollHeight, 140), // min height
        400 // max height
    );
    
    textarea.style.height = newHeight + 'px';
}

/**
 * Enhanced character counter
 */
function addEnhancedCharacterCounter(textarea) {
    // Remove existing counter
    const existingCounter = textarea.parentElement.querySelector('.character-counter');
    if (existingCounter) {
        existingCounter.remove();
    }
    
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: left;
        font-size: 0.875rem;
        color: var(--text-tertiary);
        margin-top: 0.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        opacity: 1;
        transition: all 0.2s ease;
    `;
    
    textarea.parentElement.appendChild(counter);
    updateCharacterCount(textarea);
}

/**
 * Enhanced character count update
 */
function updateCharacterCount(textarea) {
    const counter = textarea.parentElement.querySelector('.character-counter');
    if (!counter) return;
    
    const count = textarea.value.length;
    const maxLength = 1000;
    const words = textarea.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Create status indicator
    let status = '';
    let statusColor = 'var(--text-tertiary)';
    
    if (count === 0) {
        status = 'ابدأ بكتابة الأعراض...';
        statusColor = 'var(--text-tertiary)';
    } else if (count < 10) {
        status = 'أضف المزيد من التفاصيل';
        statusColor = 'var(--medical-orange)';
    } else if (count > maxLength * 0.9) {
        status = 'قارب على الحد الأقصى';
        statusColor = 'var(--medical-red)';
    } else if (count > maxLength * 0.7) {
        status = 'طول جيد';
        statusColor = 'var(--medical-orange)';
    } else {
        status = 'ممتاز';
        statusColor = 'var(--medical-green)';
    }
    
    counter.innerHTML = `
        <span style="color: ${statusColor}; font-weight: 500;">${status}</span>
        <span style="color: var(--text-tertiary);">${count}/${maxLength} • ${words} كلمة</span>
    `;
}

/**
 * Real-time validation
 */
function validateRealTime(textarea) {
    const text = textarea.value.trim();
    
    // Clear previous validation styles
    textarea.style.borderColor = '';
    
    // Apply validation styling
    if (text.length > 0 && text.length < 10) {
        textarea.style.borderColor = 'var(--medical-orange)';
    } else if (text.length > 1000) {
        textarea.style.borderColor = 'var(--medical-red)';
    } else if (text.length >= 10) {
        textarea.style.borderColor = 'var(--medical-green)';
    }
}

/**
 * Enhanced scroll animations
 */
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.example-card, .info-card, .form-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

/**
 * Enhanced smooth scrolling
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Enhanced loading overlay
 */
function setupLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (!loadingOverlay) return;
    
    // Enhanced loading messages
    const loadingMessages = [
        'بنحلل الأعراض اللي كتبتها...',
        'الذكاء الاصطناعي بيشتغل...',
        'بندور على أنسب تخصص...',
        'خلاص قريب نخلص...'
    ];
    
    let messageIndex = 0;
    let messageInterval;
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loadingOverlay.classList.contains('visible')) {
            hideLoadingOverlay();
        }
    });
    
    // Cycle through messages
    function cycleMessages() {
        const messageElement = loadingOverlay.querySelector('h3');
        if (messageElement && messageIndex < loadingMessages.length - 1) {
            messageIndex++;
            messageElement.textContent = loadingMessages[messageIndex];
        }
    }
    
    // Enhanced show function
    window.showLoadingOverlay = function() {
        loadingOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
        messageIndex = 0;
        
        // Start cycling messages
        messageInterval = setInterval(cycleMessages, 2000);
    };
    
    // Enhanced hide function
    window.hideLoadingOverlay = function() {
        loadingOverlay.classList.remove('visible');
        document.body.style.overflow = '';
        if (messageInterval) {
            clearInterval(messageInterval);
        }
    };
}

/**
 * Enhanced responsive features
 */
function setupResponsiveFeatures() {
    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const textarea = document.getElementById('medical-query');
            if (textarea) {
                autoResizeTextarea(textarea);
            }
            setViewportHeight();
        }, 250);
    });
    
    // Setup mobile features
    setupMobileFeatures();
}

/**
 * Enhanced mobile features
 */
function setupMobileFeatures() {
    // Detect touch device
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Enhanced touch interactions
        document.querySelectorAll('.btn-primary, .btn-secondary, .example-card, .info-card').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
    
    // Handle keyboard appearance on mobile
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', () => {
            const textarea = document.getElementById('medical-query');
            if (textarea && document.activeElement === textarea) {
                document.body.classList.toggle('keyboard-open', 
                    window.visualViewport.height < window.innerHeight * 0.75);
            }
        });
    }
}

/**
 * Touch optimizations
 */
function setupTouchOptimizations() {
    // Improve scroll performance on touch devices
    const scrollElements = document.querySelectorAll('.examples-scroll, .info-scroll');
    
    scrollElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.scrollBehavior = 'auto';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.scrollBehavior = 'smooth';
            }, 100);
        });
    });
}

/**
 * RESULTS PAGE FUNCTIONS
 */

/**
 * Enhanced confidence bar animation
 */
function animateConfidenceBar() {
    const confidenceFill = document.querySelector('.confidence-fill');
    
    if (!confidenceFill) return;
    
    const confidence = parseFloat(confidenceFill.getAttribute('data-confidence'));
    
    // Reset and animate
    confidenceFill.style.width = '0%';
    
    setTimeout(() => {
        confidenceFill.style.width = confidence + '%';
        
        // Dynamic color based on confidence
        if (confidence >= 80) {
            confidenceFill.style.background = 'linear-gradient(90deg, var(--medical-green) 0%, var(--medical-green-light) 100%)';
        } else if (confidence >= 60) {
            confidenceFill.style.background = 'linear-gradient(90deg, var(--medical-orange) 0%, var(--medical-orange-light) 100%)';
        } else {
            confidenceFill.style.background = 'linear-gradient(90deg, var(--medical-red) 0%, var(--medical-red-light) 100%)';
        }
    }, 800);
}

/**
 * Enhanced probability bars animation
 */
function animateProbabilityBars() {
    const probabilityFills = document.querySelectorAll('.probability-fill');
    
    probabilityFills.forEach((fill, index) => {
        const value = parseFloat(fill.getAttribute('data-value'));
        
        // Reset
        fill.style.width = '0%';
        
        // Animate with stagger
        setTimeout(() => {
            fill.style.width = value + '%';
        }, 1200 + (index * 200));
    });
}

/**
 * Enhanced specialty icon setup
 */
function setupSpecialtyIcon() {
    const specialtyName = document.querySelector('.specialty-name');
    const specialtyIcon = document.querySelector('.specialty-icon');
    const iconElement = specialtyIcon?.querySelector('.material-icons-round');
    
    if (!specialtyName || !specialtyIcon || !iconElement) return;
    
    const name = specialtyName.textContent.toLowerCase();
    
    // Enhanced icon mapping with animations
    const iconMap = {
        'عيون': { icon: 'visibility', class: 'eyes' },
        'أسنان': { icon: 'sentiment_satisfied', class: 'dental' },
        'عظام': { icon: 'accessibility_new', class: 'orthopedic' },
        'جراحة': { icon: 'accessibility_new', class: 'orthopedic' },
        'قلب': { icon: 'favorite', class: 'cardiology' },
        'نفس': { icon: 'psychology', class: 'psychiatry' },
        'هضمي': { icon: 'sick', class: 'gastro' },
        'تغذية': { icon: 'restaurant', class: 'gastro' }
    };
    
    // Find matching specialty
    let selectedIcon = { icon: 'local_hospital', class: 'general' };
    
    for (const [key, value] of Object.entries(iconMap)) {
        if (name.includes(key)) {
            selectedIcon = value;
            break;
        }
    }
    
    // Apply with animation
    iconElement.style.opacity = '0';
    iconElement.style.transform = 'scale(0.5)';
    
    setTimeout(() => {
        iconElement.textContent = selectedIcon.icon;
        specialtyIcon.className = `specialty-icon ${selectedIcon.class}`;
        
        iconElement.style.opacity = '1';
        iconElement.style.transform = 'scale(1)';
    }, 300);
}

/**
 * Enhanced results animations
 */
function setupResultsAnimations() {
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
}

/**
 * Enhanced results interactions
 */
function setupResultsInteractions() {
    // Enhanced print functionality
    window.print = function() {
        window.print();
    };
    
    // Enhanced share functionality
    window.shareResults = function() {
        const specialty = document.querySelector('.specialty-name')?.textContent;
        const confidence = document.querySelector('.confidence-value')?.textContent;
        
        const shareData = {
            title: 'نتيجة التحليل الطبي - MedClassify',
            text: `تم تحديد التخصص المناسب: ${specialty} بمستوى ثقة ${confidence}`,
            url: window.location.href
        };
        
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData).catch(err => {
                console.log('Error sharing:', err);
                copyToClipboard(window.location.href);
            });
        } else {
            copyToClipboard(window.location.href);
        }
    };
}

/**
 * UTILITY FUNCTIONS
 */

/**
 * Enhanced validation error display
 */
function showValidationError(message) {
    showNotification(message, 'error');
    
    // Enhanced shake animation
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.classList.add('shake');
        setTimeout(() => {
            formContainer.classList.remove('shake');
        }, 600);
    }
}

/**
 * Focus textarea with smooth animation
 */
function focusTextarea() {
    const textarea = document.getElementById('medical-query');
    if (textarea) {
        textarea.focus();
        textarea.style.borderColor = 'var(--medical-red)';
        setTimeout(() => {
            textarea.style.borderColor = '';
        }, 2000);
    }
}

/**
 * Enhanced notification system
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create enhanced notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Enhanced color schemes
    const colorSchemes = {
        success: { 
            bg: 'var(--medical-green-50)', 
            text: 'var(--medical-green-dark)', 
            border: 'var(--medical-green-200)',
            icon: '✅'
        },
        error: { 
            bg: 'var(--medical-red-50)', 
            text: 'var(--medical-red-dark)', 
            border: 'var(--medical-red-200)',
            icon: '⚠️'
        },
        info: { 
            bg: 'var(--primary-blue-50)', 
            text: 'var(--primary-blue-dark)', 
            border: 'var(--primary-blue-200)',
            icon: 'ℹ️'
        }
    };
    
    const scheme = colorSchemes[type] || colorSchemes.info;
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 10001;
        background: ${scheme.bg};
        color: ${scheme.text};
        border: 1px solid ${scheme.border};
        border-radius: var(--radius-xl);
        padding: 1rem 1.5rem;
        box-shadow: var(--shadow-xl);
        font-weight: 600;
        max-width: 350px;
        min-width: 250px;
        animation: slideInBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.innerHTML = `<span style="font-size: 1.2em;">${scheme.icon}</span>${message}`;
    
    // Add enhanced animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInBounce {
                0% { transform: translateX(100%) scale(0.7); opacity: 0; }
                50% { transform: translateX(-10px) scale(1.05); opacity: 1; }
                100% { transform: translateX(0) scale(1); opacity: 1; }
            }
            
            @keyframes slideOut {
                0% { transform: translateX(0) scale(1); opacity: 1; }
                100% { transform: translateX(100%) scale(0.7); opacity: 0; }
            }
            
            .shake {
                animation: shake 0.6s ease-in-out;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
                20%, 40%, 60%, 80% { transform: translateX(8px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Enhanced auto-remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.4s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 400);
        }
    }, 4000);
}

/**
 * Enhanced clipboard functionality
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('تم نسخ الرابط بنجاح', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

/**
 * Fallback copy method
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('تم نسخ الرابط', 'success');
    } catch (err) {
        showNotification('لم نتمكن من نسخ الرابط', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Enhanced error handling
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Show user-friendly error for critical failures
    if (e.error && e.error.message) {
        showNotification('حدث خطأ تقني، يرجى إعادة تحميل الصفحة', 'error');
    }
});

/**
 * Enhanced print optimization
 */
window.addEventListener('beforeprint', function() {
    document.querySelectorAll('.btn-primary, .btn-secondary, .result-actions').forEach(el => {
        el.style.display = 'none';
    });
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.querySelectorAll('.btn-primary, .btn-secondary, .result-actions').forEach(el => {
        el.style.display = '';
    });
    document.body.classList.remove('printing');
});

/**
 * Performance optimizations
 */
document.addEventListener('DOMContentLoaded', function() {
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-critical]');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
    
    // Optimize animations for low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('low-performance');
    }
});