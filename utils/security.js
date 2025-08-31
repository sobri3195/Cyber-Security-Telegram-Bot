class SecurityUtils {
  // Check password strength
  checkPasswordStrength(password) {
    let score = 0;
    let feedback = [];

    // Length check
    if (password.length >= 8) {
      score += 2;
    } else {
      feedback.push('Password terlalu pendek (minimal 8 karakter)');
    }

    if (password.length >= 12) {
      score += 1;
    }

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Common patterns to avoid
    if (/(.)\1{2,}/.test(password)) {
      score -= 1;
      feedback.push('Hindari pengulangan karakter berlebihan');
    }

    if (/123|abc|qwe|password|admin/i.test(password)) {
      score -= 2;
      feedback.push('Hindari pola yang mudah ditebak');
    }

    // Determine strength level
    let strength = '';
    if (score >= 6) strength = 'Sangat Kuat';
    else if (score >= 4) strength = 'Kuat';
    else if (score >= 2) strength = 'Sedang';
    else strength = 'Lemah';

    return {
      score,
      strength,
      feedback,
      length: password.length,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSpecialChars: /[^A-Za-z0-9]/.test(password)
    };
  }

  // Detect suspicious URLs
  detectPhishing(url) {
    const suspiciousPatterns = [
      /bit\.ly|tinyurl|goo\.gl|t\.co|is\.gd|cli\.gs|ow\.ly|su\.pr|twurl\.nl|snipurl\.com|short\.to|BudURL\.com|ping\.fm/i,
      /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/, // IP addresses
      /[a-zA-Z0-9-]+\.(tk|ml|ga|cf|gq)/, // Suspicious TLDs
      /[a-zA-Z0-9-]+\.(xyz|top|club|site|online)/, // New TLDs often used for phishing
      /[a-zA-Z0-9-]+\.(com|net|org|edu|gov)\.[a-zA-Z]{2,}/, // Subdomain abuse
      /[a-zA-Z0-9-]+\.(com|net|org|edu|gov)\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}/, // Multiple subdomains
    ];

    const suspiciousKeywords = [
      'login', 'signin', 'sign-in', 'account', 'verify', 'confirm', 'secure',
      'update', 'billing', 'payment', 'bank', 'credit', 'card', 'password',
      'security', 'alert', 'urgent', 'suspended', 'locked', 'unlock'
    ];

    let riskScore = 0;
    let warnings = [];

    // Check for suspicious patterns
    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(url)) {
        riskScore += 2;
        warnings.push('URL menggunakan layanan URL shortener atau format mencurigakan');
      }
    });

    // Check for suspicious keywords
    const urlLower = url.toLowerCase();
    suspiciousKeywords.forEach(keyword => {
      if (urlLower.includes(keyword)) {
        riskScore += 1;
        warnings.push(`URL mengandung kata kunci mencurigakan: "${keyword}"`);
      }
    });

    // Check for HTTPS
    if (!url.startsWith('https://')) {
      riskScore += 1;
      warnings.push('URL tidak menggunakan HTTPS (tidak aman)');
    }

    // Check for excessive length
    if (url.length > 100) {
      riskScore += 1;
      warnings.push('URL terlalu panjang (bisa jadi URL palsu)');
    }

    // Determine risk level
    let riskLevel = '';
    if (riskScore >= 5) riskLevel = 'SANGAT BERBAHAYA';
    else if (riskScore >= 3) riskLevel = 'BERBAHAYA';
    else if (riskScore >= 1) riskLevel = 'MENDUGA';
    else riskLevel = 'AMAN';

    return {
      riskScore,
      riskLevel,
      warnings,
      isSuspicious: riskScore >= 3,
      recommendation: riskScore >= 3 ? 'JANGAN BUKA LINK INI!' : 'Link tampak aman'
    };
  }

  // Base64 encoding/decoding
  encodeBase64(text) {
    try {
      return Buffer.from(text, 'utf8').toString('base64');
    } catch (error) {
      return 'Error encoding text';
    }
  }

  decodeBase64(encodedText) {
    try {
      return Buffer.from(encodedText, 'base64').toString('utf8');
    } catch (error) {
      return 'Error decoding text - pastikan input adalah Base64 yang valid';
    }
  }
}

module.exports = SecurityUtils;
