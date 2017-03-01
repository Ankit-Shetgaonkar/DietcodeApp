package com.musefonts;

import android.content.Context;
import android.graphics.Typeface;
import android.util.AttributeSet;
import android.widget.TextView;

/**
 * Created by divyanshunegi on 2/28/17.
 * Project : DietcodeAndroid
 */
public class MuseText500 extends TextView {

    private static Typeface mTypeface;

    public MuseText500(final Context context) {
        this(context, null);
    }

    public MuseText500(final Context context, final AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public MuseText500(final Context context, final AttributeSet attrs, final int defStyle) {
        super(context, attrs, defStyle);

        if (mTypeface == null) {
            mTypeface = Typeface.createFromAsset(context.getAssets(), "museosans300.ttf");
        }
        setTypeface(mTypeface);
    }

}
