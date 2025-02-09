%% Windows of Opportunities 
High=3;
Medium=2;
Low=1;


% INPUT - user definned

U_value=input('Enter UV number: ');
Coating_number=input('Enter Coating number: '); % [0 1 2]; Coating_number=[0 1 2]; % 0- high recycling ,  1-medium recycling, 2-low recycling
Glass_panel_number=input('Enter Glass panel number: '); %
Year=input('Enter Year: '); %

Year_Limits=[1990 2010 2025];
U_value_limits=[0.7 1.2 1.8]; % limits for Reuse Glas & Reuse Sashes

if ~exist('U_value', 'var') || isempty(U_value)
    % IF UV is not expert
    % UV not expert algorithm
    if Year>Year_Limits(2) && Glass_panel_number==3 && Coating_number==0 || Coating_number==1 || Coating_number==2
        U_value=0.4;
    elseif Year>Year_Limits(2) && Glass_panel_number==2 && Coating_number==0 || Coating_number==1 || Coating_number==2
        U_value=1;
    elseif Year>Year_Limits(1) && Year<Year_Limits(2) && Glass_panel_number==3 || Coating_number==0 || Coating_number==1 || Coating_number==2
        U_value=0.8;
    elseif Year>Year_Limits(1) && Year<Year_Limits(2) && Glass_panel_number==2 || Coating_number==0 || Coating_number==1 || Coating_number==2
        U_value=1.1;
    elseif Year<Year_Limits(1) && Glass_panel_number==3 && Coating_number==0 || Coating_number==1 || Coating_number==2
        U_value=1.9;
    elseif Year<Year_Limits(1) && Glass_panel_number==2 && Coating_number==0 || Coating_number==1 || Coating_number==2
        U_value=2.7;
    end
else

end



% Recycling algorithm
if Coating_number==0
    Recycling=High;
elseif Coating_number==1
    Recycling=Medium;
elseif Coating_number==2
    Recycling=Low;
end

% Reuse Glass algorithm
if Glass_panel_number==3 && U_value<U_value_limits(1)
    ReuseGlass=High;
elseif Glass_panel_number==2 && U_value<U_value_limits(2)
    ReuseGlass=High;
elseif Glass_panel_number==3 && U_value<U_value_limits(2) && U_value>U_value_limits(1)
    ReuseGlass=Medium;
elseif Glass_panel_number==2 && U_value<U_value_limits(2) && U_value>U_value_limits(1)
    ReuseGlass=Medium;
elseif Glass_panel_number==3 && U_value>U_value_limits(2)
    ReuseGlass=Low;
elseif Glass_panel_number==2 && U_value>U_value_limits(3)
    ReuseGlass=Low;
end

if Glass_panel_number==3 && U_value<U_value_limits(1)
    ReuseSashes=High;
elseif Glass_panel_number==2 && U_value<U_value_limits(2)
    ReuseSashes=High;
elseif Glass_panel_number==3 && U_value<U_value_limits(2) && U_value>U_value_limits(1)
    ReuseSashes=Medium;
elseif Glass_panel_number==2 && U_value<U_value_limits(2) && U_value>U_value_limits(1)
    ReuseSashes=Medium;
elseif Glass_panel_number==3 && U_value>U_value_limits(2)
    ReuseSashes=Low;
elseif Glass_panel_number==2 && U_value>U_value_limits(3)
    ReuseSashes=Low;
end


if Year>Year_Limits(2) && Year<Year_Limits(3) && U_value<U_value_limits(1)
    ReuseWindow=High;
elseif Year>Year_Limits(2) && Year<Year_Limits(3) && U_value<U_value_limits(2) && U_value>U_value_limits(1)
    ReuseWindow=Medium;
elseif Year>Year_Limits(1) && Year<Year_Limits(2) 
    ReuseWindow=Medium;
elseif Year<Year_Limits(1) && U_value<U_value_limits(1) && U_value>U_value_limits(3)
    ReuseWindow=Low;
elseif Year<Year_Limits(1) && Year>Year_Limits(3) && U_value<U_value_limits(2)
    ReuseWindow=Low;
elseif Year<Year_Limits(1) && Year>Year_Limits(3) && U_value>U_value_limits(2)
    ReuseWindow=Low;
end


