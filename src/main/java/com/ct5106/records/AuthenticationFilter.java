package com.ct5106.records;


import com.ct5106.records.Service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AuthenticationFilter extends OncePerRequestFilter
{
    private final JwtService jwtService;
    // injecting our JWT service class
    public AuthenticationFilter(JwtService jwtService)
    {
        this.jwtService = jwtService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, java.io.IOException
    {
// Get token from the Authorization header
        String jws = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (jws != null)
        {
// Verify token and get user
            String user = jwtService.getAuthUser(request);
// Authenticate
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null,
                    java.util.Collections.emptyList());
// now get Spring Security to store the details of the authenticated user
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
// do the next filter in the chain, if any
        filterChain.doFilter(request, response);
    }
}

